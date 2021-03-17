Algorithm T has something slightly arbitrary to it.
All these jumps; and that stack you have to keep around.
And yet, the recursive version of the inorder traversal is so clean, so beautiful:

```typescript
function traverse(btree, visit) {
    if (btree !== Λ) {
        traverse(btree.llink, visit);
        visit(btree);
        traverse(btree.rlink, visit);
    }
}
```

About the only bad thing I can say about this implementation is that it could overflow the stack.
Not going to happen with a balanced binary tree, but could well happen with a pathological one, such as a couple thousand rlinks in a row.

Is there a way we could translate the above recursive version into the iterative version in Algorithm T?
Preferably in small steps, where each step can be shown not to change the semantics.
How _do_ you do that?

As it turns out, _yes_, there is a way to mechanically transform this code.
It happens through a certain code style called "Continuation-Passing Style" (CPS).
After doing this myself, it feels like Knuth's major contribution has been to do this transformation for us.

Instead of worrying about exactly a continuation is, let's describe this style:
You identify every "gap" between statements, and give it a state number.

```diff
@@ -1,7 +1,12 @@
 function traverse(btree, visit) {
+    // state 1
     if (btree !== Λ) {
+        // state 2
         traverse(btree.llink, visit);
+        // state 3
         visit(btree);
+        // state 4
         traverse(btree.rlink, visit);
     }
+    // state 5
 }
```

(The "gap" at the end of the `if` block does not need its own state;
it is identical to the "gap" at the end of the function.)

Then, instead of the runtime taking us between these states, we do it ourselves.
(We "privatise" control flow, as it were.)
Perhaps the simplest way to do that is via a switch statement in a loop:

```diff
@@ -1,7 +1,24 @@
 function traverse(btree, visit) {
+    let state = 1;
+    while (true) {
+        switch (state) {
+            case 1:
-    if (btree !== Λ) {
+                state = btree === Λ ? 5 : 2;
+                break;
+            case 2:
                 traverse(btree.llink, visit);
+                state = 3;
+                break;
+            case 3:
                 visit(btree);
+                state = 4;
+                break;
+            case 4:
                 traverse(btree.rlink, visit);
+                state = 5;
+                break;
+            case 5:
+                return;
+        }
     }
 }
```

The code is longer and more explicit, but it's the same code.
The CPS transform has "spread it out" so that we can see the links connecting the statements.
Notably, the `if` statement turned into a `?:` in state 1. (I double-negated it.)
The `return` in state 5 is a tiny cheat we allow ourselves to terminate the algorithm.

Now for the main twist:
We claim that calling `traverse` recursively in states 2 and 4 is equivalent to jumping back into the top of the function, state 1.
Except for two things:

* We need to remember the current value of `btree` for later. The recursive call "overwrites" `btree` and we need to get the value back as we return back up.
* We need to remember which state we are going to after returning from the recursive call.

We remember these two details by pushing them onto a manual stack.
(Just storing them into a scalar variable won't be enough since several recursive calls nest in each other.)
Recursing down then corresponds to pushing onto the manual stack, while returning back up corresponds to popping.
The object stored on the stack could well be called "the continuation"; it has what we need to continue after the call.
The `return` cheat that we allowed ourselves, we're now only really allowed to use when the stack is empty;
this is because we can only truly return from the top level of the recursive call hierarchy.

```diff
@@ -1,4 +1,5 @@
 function traverse(btree, visit) {
     let state = 1;
+    let manualStack = [];
     while (true) {
         switch (state) {
@@ -7,6 +8,7 @@
                 break;
             case 2:
-                traverse(btree.llink, visit);
-                state = 3;
+                manualStack.push({ btree, state: 3 });
+                btree = btree.llink;
+                state = 1;
                 break;
             case 3:
@@ -15,9 +17,14 @@
                 break;
             case 4:
-                traverse(btree.rlink, visit);
-                state = 5;
+                manualStack.push({ btree, state: 5 });
+                btree = btree.rlink;
+                state = 1;
                 break;
             case 5:
-                return;
+                if (manualStack.length === 0) {
+                    return;
+                }
+                { btree, state } = manualStack.pop();
+                break;
         }
     }
```

Now let's clean up.

Pushing to the stack in the case of right subtree gives us absolutely nothing;
the only thing we do if we find such a stack value in state 5 is to loop straight back into state 5, hoping for another value.
We're pushing with no recipient in the other end.
So let's stop pushing those values when recursing down the right subtree.

```diff
@@ -17,5 +17,4 @@
                 break;
             case 4:
-                manualStack.push({ btree, state: 5 });
                 btree = btree.rlink;
                 state = 1;
```

But of course, now we could immediately jump into state 3 from state 5, since the only thing we ever push are left subtrees.
And since that's the case, we don't even need to signal it anymore:

```diff
@@ -7,6 +7,6 @@
                 break;
             case 2:
-                manualStack.push({ btree, state: 3 });
+                manualStack.push(btree);
                 btree = btree.llink;
                 state = 1;
@@ -24,5 +24,6 @@
                     return;
                 }
-                { btree, state } = manualStack.pop();
+                btree = manualStack.pop();
+                state = 3;
                 break;
         }
```

(Could we have foreseen this simplification? Yes, a Scheme programmer would have taken one look at the original recursive formulation and told you that the recursive call for the right subtree is in "tail position". Which is exactly when [we can optimize away the recursion](http://lambda-the-ultimate.org/node/1331#comment-15125).)

State 4 can be "squashed" into state 3, since state 3 is unique in jumping to state 4:

```diff
@@ -14,7 +14,4 @@
             case 3:
                 visit(btree);
-                state = 4;
-                break;
-            case 4:
                 btree = btree.rlink;
                 state = 1;
```

If we rename states and variables, introduce an extra "initializing" state, and re-order the states, we arrive at Algorithm T:

```typescript
function traverse(T, visit) {
    let P, A;
    let state = "T1";
    while (true) {
        switch (state) {
            case "T1":
                A = [];
                P = T;
                state = "T2";
                break;
            case "T2":
                state = P === Λ ? "T4" : "T3";
                break;
            case "T3":
                A.push(P);
                P = P.llink;
                state = "T2";
                break;
            case "T4":
                if (A.length === 0) {
                    return;
                }
                P = A.pop();
                state = "T5";
                break;
            case "T5":
                visit(P);
                P = P.rlink;
                state = "T2";
                break;
        }
    }
}
```

Now, of course, I wouldn't call this "idiomatic JavaScript".
Since the Structured Programming revolution, we prefer to express code using conditional statements and loops.
So let's try "CPS un-transforming" the code once again:

```typescript
function traverse(T, visit) {
    // T1
    let P = T;
    let A = [];
    // T2
    while (P !== Λ) {
        // T3
        A.push(P);
        P = P.llink;
    }
    // T4
    while (A.length > 0) {    
        P = A.pop();
        // T5
        visit(P);
        P = P.rlink;
        // T2, duplicated (!)
        while (P !== Λ) {
            A.push(P);
            P = P.llink;
        }
    }
}
```

As you can see, we then get the dreaded "loop-and-a-half" problem, wherein we have to duplicate T2 before and inside the loop.
The problem _can_ be solved with structured programming, if you're fine with `while (true)` in combination with `break` (I am):

```typescript
function traverse(T, visit) {
    let P = T;
    let A = [];
    while (true) {    
        while (P !== Λ) {
            A.push(P);
            P = P.llink;
        }
        if (A.length === 0) {
            break;
        }
        P = A.pop();
        visit(P);
        P = P.rlink;
    }
}
```

In summary, Algorithm T as proposed by Knuth can be derived by CPS-transforming the recursive formulation of in-order traversal.

Looking ahead a bit at exercises 12 and 13, these can get the same CPS treatment as Algorithm T:

* For the preorder traversal, things are largely the same.
  We can visit the node before pushing it on the stack, but we still need to put it on the stack in order to later traverse its right subtree.

* For the postorder traversal, there's a _twist_.
  Now we need _two_ stacks: one for remembering a node while we traverse its left subtree, and one for remembering a node while we traverse its _right_ subtree.
  We could also do it with a single stack, if we push the node along with its `state` information;
  but this time around, there is no simplifying step that lets us elimiate `state` from the data on the stack.


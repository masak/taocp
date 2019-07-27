import Control.Monad
import Text.Printf

admissible :: String -> Bool
admissible = check 0
    where check :: Int -> String -> Bool
          check    n       [] = n == 0
          check (-1)        _ = False
          check    n ('S':bs) = check (n+1) bs
          check    n ('X':bs) = check (n-1) bs

sequences :: [String]
sequences = ["SSXSSXXX", "SXXSSXXS"]

main :: IO ()
main = do
    forM_ sequences (\s -> printf "%s: %s" s (show (admissible s)))

import System.IO (hFlush, stdout)

combinedRemainder :: Int -> Int -> Int -> Int -> Int
combinedRemainder m n mr nr = (d2 * (modularInverse d1 mn)) `mod` mn
    where
        d1 = n - m
        d2 = mr * n - nr * m
        mn = m * n

modularInverse :: Int -> Int -> Int
modularInverse m n = go 1 0 m n
    where
        go :: Int -> Int -> Int -> Int -> Int
        go a' a c d = let (q, r) = c `divMod` d
            in case r of
                0 -> a
                _ -> go a (a' - q * a) d r

prompt :: String -> IO Int
prompt query = do
    putStr query
    hFlush stdout
    readLn :: IO Int

coprime :: Int -> Int -> Bool
coprime m n = gcd m n == 1

askForRemainders :: Int -> Int -> IO ()
askForRemainders m n = do
    let mn = m * n
    mr <- prompt ("x mod " ++ (show m) ++ " = ")
    nr <- prompt ("x mod " ++ (show n) ++ " = ")
    let mnr = combinedRemainder m n mr nr
    putStrLn ("x mod " ++ (show mn) ++ " = " ++ (show mnr))

main :: IO ()
main = do
    m <- prompt "Value of m: "
    n <- prompt "Value of n: "
    if coprime m n then
        askForRemainders (min m n) (max m n)
        else error "The two values need to be coprime"

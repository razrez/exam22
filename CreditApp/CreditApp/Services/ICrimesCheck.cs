namespace CreditApp.Services;

public interface ICrimesCheck
{
    Task<bool> HasCrimes(string test);
}
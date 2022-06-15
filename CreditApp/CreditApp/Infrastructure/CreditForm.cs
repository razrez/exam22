using CreditApp.Infrastructure.Enums;

namespace CreditApp.Infrastructure;

public class CreditForm
{
    #region Constructors
    public CreditForm(){}
    public CreditForm(int age, string? fullname, EmploymentEnum employment,
        PurposeEnum purpose, DepositEnum deposit, 
        int carAge, bool alreadyHasCredits, int credit)
    {
        Age = age;
        Fullname = fullname;
        Employment = employment;
        Purpose = purpose;
        Deposit = deposit;
        CarAge = carAge;
        AlreadyHasCredits = alreadyHasCredits;
        Credit = credit;
    }
    #endregion

    public string? Fullname { get; set; }
    
    public int PassportSeries { get; set; }
    
    public int PassportNumber { get; set; }
    
    public string? PassportIssuer { get; set; }
    
    public DateTime PassportIssueDate { get; set; }
    
    public string? PassportRegistrationPlace { get; set; }
    
    public int Age { get; set; }
    
    public bool HasCrimeCertificate { get; set; }
    
    public EmploymentEnum Employment { get; set; }
    
    public PurposeEnum Purpose { get; set; }
    
    public DepositEnum Deposit { get; set; }
    
    public int CarAge { get; set; }
    
    public bool AlreadyHasCredits { get; set; }
    
    public int Credit { get; set; }
}
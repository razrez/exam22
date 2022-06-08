using CreditApp.Infrastructure.Enums;

namespace CreditApp.Infrastructure;

public class CreditForm
{
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
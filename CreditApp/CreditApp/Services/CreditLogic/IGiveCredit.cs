namespace CreditApp.Services.CreditLogic;

public interface IGiveCredit
{
    int TotalPoints { get; set; }
    Task CalculateTotalPointsAsync();
}
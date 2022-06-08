using CreditApp.Infrastructure;

namespace CreditApp.Services.CreditLogic;

public interface IGiveCredit
{
    int TotalPoints { get; set; }
    string CalculateResult(CreditForm creditForm);
}
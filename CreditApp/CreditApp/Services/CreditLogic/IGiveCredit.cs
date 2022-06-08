using CreditApp.Infrastructure;

namespace CreditApp.Services.CreditLogic;

public interface IGiveCredit
{
    int TotalPoints { get; set; }
    Task<string> ReturnResultTask(CreditForm creditForm, bool realCrimesInfo);
    string CalculateResult(CreditForm creditForm, bool realCrimesInfo);

}
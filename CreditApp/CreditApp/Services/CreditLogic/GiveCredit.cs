using CreditApp.Infrastructure;
using CreditApp.Infrastructure.Enums;

namespace CreditApp.Services.CreditLogic;

public class GiveCredit: IGiveCredit
{
    public int TotalPoints { get; set; }
    public async Task<string> ReturnResultTask(CreditForm creditForm, bool realCrimesInfo)
    {
        var res = await 
            Task.Run(() => CalculateResult(creditForm, realCrimesInfo));
        /*var res = CalculateResult(creditForm, realCrimesInfo);*/
        
        return res;
    }
    
    public string CalculateResult(CreditForm creditForm, bool realCrimesInfo)
    {
        var message = "";
        if (!creditForm.HasCrimeCertificate && realCrimesInfo)
        {
            creditForm.HasCrimeCertificate = realCrimesInfo;
            message = "Проверка показала, что клиент привлекался к уголовной ответственности.";
        }
        
        TotalPoints = GetAgePoints(creditForm.Age, creditForm.Credit, creditForm.Deposit) +
                     GetCrimesPoints(creditForm.HasCrimeCertificate) +
                     GetEmploymentPoints(creditForm.Employment, creditForm.Age) +
                     GetPurposePoints(creditForm.Purpose) +
                     GetDepositPoints(creditForm.Deposit, creditForm.CarAge) +
                     GetOtherCreditsPoints(creditForm.AlreadyHasCredits, creditForm.Purpose) +
                     GetAgePoints(creditForm.Credit);
        return TotalPoints switch
        {
            < 80 
                => $"{message} Кредит не одобрен. Балл: {TotalPoints}",
            >= 80 and < 84 
                => $"{message} Кредит одобрен с процентной ставкой 30%. Балл: {TotalPoints}",
            >= 84 and < 88 
                => $"{message} Кредит одобрен с процентной ставкой 26%. Балл: {TotalPoints}",
            >= 88 and < 92 
                => $"{message} Кредит одобрен с процентной ставкой 22%. Балл: {TotalPoints}",
            >= 92 and < 96 
                => $"{message} Кредит одобрен с процентной ставкой 19%. Балл: {TotalPoints}",
            >= 96 and < 100 
                => $"{message} Кредит одобрен с процентной ставкой 15%. Балл: {TotalPoints}",
            100 => $"Кредит одобрен с процентной ставкой 12,5%. Балл: {TotalPoints}",
            _ => $"{message} Одобрено. Балл: {TotalPoints}"
        };
    }

    private int GetAgePoints(int adult, int creditSum, DepositEnum depositEnum) =>
        adult switch
        {
            >= 21 and <= 28 => creditSum switch
            {
                < 1000000 => 12,
                >= 1000000 and <= 3000000 => 9,
                _ => 0
            },
            >= 29 and <= 59 => 14,
            >= 60 and <= 72 => depositEnum == DepositEnum.None ? 0 : 8,
            _ => 0
        };

    private int GetCrimesPoints(bool isReallyJudged) => isReallyJudged ? 0 : 15;

    private int GetEmploymentPoints(EmploymentEnum employmentEnum, int age)
    {
        
        return employmentEnum switch
        {
            EmploymentEnum.ContractLaborCodeRusFed => 14,
            EmploymentEnum.IndividualEntrepreneur => 12,
            EmploymentEnum.Freelancer => 8,
            EmploymentEnum.Retiree => age < 70 ? 5 : 0,
            _ => 0
        };
    }

    private int GetPurposePoints(PurposeEnum purposeEnum) =>
        purposeEnum switch
        {
            PurposeEnum.Consumer => 14,
            PurposeEnum.Realty => 8,
            PurposeEnum.Recrediting => 12,
            _ => 0
        };

    private int GetDepositPoints(DepositEnum depositEnum, int carAge) =>
        depositEnum switch
        {
            DepositEnum.Retiree => 14,
            DepositEnum.Car => carAge <= 3 ? 8 : 3,
            DepositEnum.Guarantee => 12,
            _ => 0
        };

    private int GetOtherCreditsPoints(bool otherCredits, PurposeEnum purposeEnum)
    {
        if (otherCredits) return 0;
        return purposeEnum == PurposeEnum.Recrediting ? 0 : 15;
    }

    private int GetAgePoints(int age) =>
        age switch
        {
            >= 0 and < 1000000 => 12,
            >= 1000000 and < 5000000 => 14,
            >= 5000000 and < 10000000 => 8,
            _ => 0
        };
}
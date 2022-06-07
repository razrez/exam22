namespace Exam.Services.CreditLogic;

public interface IGiveCredit
{
    int TotalPoints { get; set; }
    Task CalculateTotalPointsAsync();
}
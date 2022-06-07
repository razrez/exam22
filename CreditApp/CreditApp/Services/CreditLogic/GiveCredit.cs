namespace CreditApp.Services.CreditLogic;

public class GiveCredit: IGiveCredit
{
    public int TotalPoints { get; set; }
    public async Task CalculateTotalPointsAsync()
    {
        Console.WriteLine("Начало метода PrintAsync"); // выполняется синхронно
        await Task.Run(() => Print());                // выполняется асинхронно
        Console.WriteLine("Конец метода PrintAsync");
    }
    void Print()
    {
        Thread.Sleep(300);     // имитация продолжительной работы
        Console.WriteLine("Hello METANIT.COM");
    }
}
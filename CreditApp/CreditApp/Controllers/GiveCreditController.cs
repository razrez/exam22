using CreditApp.Infrastructure;
using CreditApp.Services;
using CreditApp.Services.CreditLogic;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace CreditApp.Controllers;

[ApiController]
[Route("give")]
[Produces("applications/json")]

public class GiveCreditController : ControllerBase
{
    private readonly ICrimesCheck _crimesCheck; // псевдо-сервис проверки судимости
    private readonly IGiveCredit _giveCredit; 

    public GiveCreditController(IGiveCredit giveCredit)
    {
        //псевдо реаизация сервиса
        var mock = new Mock<ICrimesCheck>();
        mock.Setup(s => s.HasCrimes(It.IsAny<string>()))
            .ReturnsAsync(new Random().Next(100) % 2 == 0);
        
        _crimesCheck = mock.Object;
        _giveCredit = giveCredit;
    }

    [HttpPost("credit")]
    public async Task<IActionResult> Post([FromBody]CreditForm creditForm)
    {
        //check real crimes 
        var realCrimesInfo = _crimesCheck.HasCrimes(creditForm.Fullname!);
        
        //accept or not a credit
        string? jsonRes = null;

        realCrimesInfo.Wait(5000);
        #region Хочу проверить, что вернется раньше

        if (realCrimesInfo.IsCompletedSuccessfully)
        {
            jsonRes += "изначальный тред:" + Thread.CurrentThread.ManagedThreadId + "\n"; 
            
            var task1 = await Task
                .Run(() => _giveCredit.CalculateResult(creditForm, realCrimesInfo.Result) + $" || Task.Run {DateTime.Now}||");
            
            Thread.Sleep(1000);

            jsonRes += $"{task1}" + $" || Task.End{ DateTime.Now}|| " + "\n";
            jsonRes += "Конечный тред:" + Thread.CurrentThread.ManagedThreadId + "\n"; 
        }
        #endregion
        
        return new JsonResult(new { result = jsonRes });
    }
}
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
        var realCrimesInfo = await _crimesCheck.HasCrimes(creditForm.Fullname!);
        
        //accept or not a credit
        var result = await _giveCredit.ReturnResultTask(creditForm, realCrimesInfo);
        
        return new JsonResult(new { result = $"{result}"});
    }
}
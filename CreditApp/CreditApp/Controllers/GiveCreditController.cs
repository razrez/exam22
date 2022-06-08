using CreditApp.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace CreditApp.Controllers;

[ApiController]
[Route("give")]
public class GiveCreditController : ControllerBase
{
    private readonly ICrimesCheck _crimesCheck;

    public GiveCreditController()
    {
        var mock = new Mock<ICrimesCheck>();
        
        mock.Setup(s => s.HasCrimes(It.IsAny<string>()))
            .ReturnsAsync(new Random().Next(100) % 2 == 0);
        
        _crimesCheck = mock.Object;
    }

    [HttpPost("credit")]
    public async Task<IActionResult> Post()
    {
        var test = await _crimesCheck.HasCrimes("123123");
        return test ? 
            new JsonResult( new { result = "У клиента есть судимость!" }) 
            : new JsonResult( new { result = "У клиента нет судимости :)" });
    }
}
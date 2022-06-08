using CreditApp.Services;
using CreditApp.Services.CreditLogic;
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
            .Returns(new Random().Next(100) % 2 == 0);
        _crimesCheck = mock.Object;
    }

    [HttpPost("credit")]
    public IActionResult Post()
    {
        return new JsonResult( new{  result = "post" });
    }
}
using Microsoft.AspNetCore.Mvc;

namespace CreditApp.Controllers;

[ApiController]
[Route("give")]
public class GiveCreditController : ControllerBase
{
    [HttpPost("credit")]
    public IActionResult Post()
    {
        return new JsonResult(new
        {
            result = "post"
        });
    }
}
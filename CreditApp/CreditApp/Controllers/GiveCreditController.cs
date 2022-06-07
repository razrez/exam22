using Microsoft.AspNetCore.Mvc;

namespace CreditApp.Controllers;

[ApiController]
[Route("[controller]")]
public class GiveCreditController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return new JsonResult(new
        {
            result = "get"
        });
    }

    [HttpPost]
    public IActionResult Post()
    {
        return new JsonResult(new
        {
            result = "post"
        });
    }
}
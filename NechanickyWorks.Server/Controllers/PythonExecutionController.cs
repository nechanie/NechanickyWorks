using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace NechanickyWorks.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PythonExecutionController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public PythonExecutionController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        //[HttpPost]
        //[Route("run-capston")]
        //public async Task<IActionResult> RunCapston([FromBody] InputModel input)
        //{
        //    var functionUrl = "https://<your-azure-function-app>.azurewebsites.net/api/CapstonFunction?code=<your_function_key>";
        //    var response = await _httpClient.PostAsync(functionUrl, new StringContent(JsonConvert.SerializeObject(input), System.Text.Encoding.UTF8, "application/json"));
        //    var result = await response.Content.ReadAsStringAsync();
        //    return Ok(result);
        //}
    }
}

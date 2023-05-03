using System.Net;

namespace Keyshoot.Api.Exceptions;

public class BaseApiException : Exception
{
    public HttpStatusCode Code { get; }
    public object Errors { get; set; }

    public BaseApiException(HttpStatusCode code, object errors)
    {
        Code = code;
        Errors = errors;
    }
}

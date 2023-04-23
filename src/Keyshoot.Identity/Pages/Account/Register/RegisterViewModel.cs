using System.ComponentModel.DataAnnotations;

namespace Keyshoot.Identity.Pages.Account.Register;

public class RegisterViewModel
{
    [Required]
    public string Username { get; set; }
    [Required]
    public string Password { get; set; }
    [Required]
    public string Email { get; set; }
    public string ReturnUrl { get; set; }
}
    
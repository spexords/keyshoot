using IdentityModel;
using Keyshoot.Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Security.Claims;

namespace Keyshoot.Identity.Pages.Account.Register
{
    public class IndexModel : PageModel
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        [BindProperty]
        public RegisterViewModel Input { get; set; }

        public IndexModel(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

        public async Task<IActionResult> OnGet(string returnUrl)
        {
            Input = new RegisterViewModel
            {
                ReturnUrl = returnUrl
            };
            return Page();
        }

        public async Task<IActionResult> OnPost(string returnUrl)
        {
            if(ModelState.IsValid)
            {
                var user = new AppUser
                {
                    UserName = Input.Username,
                    Email = Input.Email
                };

                var result = await _userManager.CreateAsync(user, Input.Password);

                if(result.Succeeded)
                {
                    await _userManager.AddClaimsAsync(user, new Claim[]
                    {
                        new Claim(JwtClaimTypes.Id, user.UserName),
                    });

                    var loginResult = await _signInManager.PasswordSignInAsync(Input.Username, Input.Password, false, false);

                    if(loginResult.Succeeded)
                    {
                        if(Url.IsLocalUrl(Input.ReturnUrl))
                        {
                            return Redirect(Input.ReturnUrl);
                        }
                        else if(string.IsNullOrEmpty(Input.ReturnUrl))
                        {
                            return Redirect("~/");
                        }
                        else
                        {
                            throw new Exception("Invalid return url");
                        }
                    }
                }
            }
            return Page();
        }
    }
}

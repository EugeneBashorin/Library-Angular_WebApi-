using System.ComponentModel.DataAnnotations;

namespace Library_Angular_WebApi_.Models
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Important field")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required(ErrorMessage = "Important field")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
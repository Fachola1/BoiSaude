using System.ComponentModel.DataAnnotations;

namespace ProdutosBoiSaude.Models;

public class Produto
{
    public int Id { get; set; }

    [Required(ErrorMessage = "O nome é obrigatório")]
    [StringLength(100, ErrorMessage = "O nome deve ter no máximo 100 caracteres")]
    public string Nome { get; set; } = string.Empty;

    [Required(ErrorMessage = "O preço de custo é obrigatório")]
    [Range(0, double.MaxValue, ErrorMessage = "O preço de custo deve ser maior que zero")]
    public decimal PrecoCusto { get; set; }

    [Required(ErrorMessage = "O preço de venda é obrigatório")]
    [Range(0, double.MaxValue, ErrorMessage = "O preço de venda deve ser maior que zero")]
    public decimal PrecoVenda { get; set; }

    [Required(ErrorMessage = "A quantidade é obrigatória")]
    [Range(0, int.MaxValue, ErrorMessage = "A quantidade deve ser maior ou igual a zero")]
    public int Quantidade { get; set; }
}
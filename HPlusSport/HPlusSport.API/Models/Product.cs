using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HPlusSport.API.Models
{
    public class Product
    {
        
        public int Id { get; set; }

        
        [Required]
        public string Sku { get; set; } = string.Empty;

        
        [Required]
        public string Name { get; set; } = string.Empty;

    
        [Required]
        public string Description { get; set; } = string.Empty;

       
        public decimal Price { get; set; }

        // Availability status of the product
        public bool IsAvailable { get; set; }

        // Foreign key for the Category entity, required
        [Required]
        public int CategoryId { get; set; }

        // Navigation property for the Category, ignored during JSON serialization to prevent circular references
        [JsonIgnore]
        public virtual Category? Category { get; set; }
    }
}

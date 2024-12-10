import 'C:\\Users\\catri\\react-app\\frontend\\cadastroapp\\src\\addproduct.css'; // Estilo integrado
import React, { useState, useEffect } from "react";
import axios from "axios";

const AddProduct = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    current_quantity: 0,
    minimum_quantity: 0,
    supplier_id: "",
  });
  const [suppliers, setSuppliers] = useState([]); // Lista de fornecedores
  const [filteredSuppliers, setFilteredSuppliers] = useState([]); // Fornecedores filtrados
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch de fornecedores ao montar o componente
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/suppliers");
        setSuppliers(response.data);
        setFilteredSuppliers(response.data); // Inicialmente, todos os fornecedores são exibidos
      } catch (err) {
        console.error("Erro ao buscar fornecedores:", err);
        setError("Erro ao carregar fornecedores");
      }
    };
    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("quantity") ? parseInt(value) || 0 : value,
    }));
    setError(null);
    setSuccess(false);

    // Filtragem do dropdown
    if (name === "supplier_id") {
      const filtered = suppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuppliers(filtered);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      type: "",
      current_quantity: 0,
      minimum_quantity: 0,
      supplier_id: "",
    });
    setError(null);
    setSuccess(false); // Garante que a mensagem de sucesso não será exibida
  };

  const validateForm = () => {
    if (formData.current_quantity < 0 || formData.minimum_quantity < 0) {
      setError("As quantidades não podem ser negativas");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      // Envia o produto para o backend
      const response = await axios.post(
        "http://localhost:3000/api/products",
        formData
      );

      if (response.status === 201) {
        setSuccess(true);
        resetForm();
        if (onProductAdded) {
          onProductAdded(response.data);
        }
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Erro ao adicionar o produto"
      );
      console.error("Erro ao adicionar produto:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      <h2 className="title">Cadastrar Produto</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Produto adicionado com sucesso!</div>}

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Nome do Produto</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nome do Produto"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Descrição"
            value={formData.description}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Tipo</label>
          <input
            type="text"
            id="type"
            name="type"
            placeholder="Tipo"
            value={formData.type}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="current_quantity">Quantidade Atual</label>
          <input
            type="number"
            id="current_quantity"
            name="current_quantity"
            placeholder="Quantidade Atual"
            value={formData.current_quantity}
            onChange={handleChange}
            required
            min="0"
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="minimum_quantity">Quantidade Mínima</label>
          <input
            type="number"
            id="minimum_quantity"
            name="minimum_quantity"
            placeholder="Quantidade Mínima"
            value={formData.minimum_quantity}
            onChange={handleChange}
            required
            min="0"
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="supplier_id">Fornecedor</label>
          <input
            type="text"
            id="supplier_id"
            name="supplier_id"
            placeholder="Digite ou selecione o fornecedor"
            value={formData.supplier_id}
            onChange={handleChange}
            list="suppliers"
            required
            disabled={isLoading}
          />
          <datalist id="suppliers">
            {filteredSuppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.name} />
            ))}
          </datalist>
        </div>
        <div className="button-group">
          <button
            type="button"
            className="cancel-button"
            onClick={resetForm}
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="save-button"
            disabled={isLoading}
          >
            {isLoading ? "Adicionando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;


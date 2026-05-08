export interface IProduit {
  IdCategory: number;
  nom: string;
  desc: string;
  img: string;
  prix: number;
  onAdd?: () => void;
}

function Produit(props: IProduit) {
  const { nom, desc, img, prix, onAdd } = props;

  return (
    <div className="product-card">
      <div className="product-img-wrap">
        <img src={img} alt={nom} />
        <span className="price-badge">{prix.toLocaleString()} CFA</span>
      </div>
      <div className="product-content">
        <h3 className="product-title">{nom}</h3>
        <p className="product-desc">{desc}</p>
        <button className="btn-add" onClick={onAdd}>
          <i className="fas fa-plus-circle"></i>
          Ajouter
        </button>
      </div>
    </div>
  );
}

export default Produit;
import Category from "./Category/Category";
import ListeCategory from "./Category/ListeCategory";
import ListeProduit from "./Produit/ListeProduit";
import Produit from "./Produit/Produit";
import { useState, useMemo } from "react";

function App() {
  const [CategoryID, setCategoryID] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProduits = useMemo(() => {
    return ListeProduit.filter((produit) => {
      const matchCategory = CategoryID === 0 || produit.IdCategory === CategoryID;
      const matchSearch = produit.nom.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          produit.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [CategoryID, searchQuery]);

  return (
    <div className="app-container">
      <header className="db-header">
        <div>
          <h1 className="db-title">La Carte</h1>
          <p className="subtitle">Explorez nos délices et spécialités maison</p>
        </div>
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input 
            type="text" 
            className="search-input"
            placeholder="Rechercher un plat, une boisson..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="categories-tabs">
        <div 
          className={`category-pill ${CategoryID === 0 ? 'active' : ''}`}
          onClick={() => setCategoryID(0)}
        >
          <span>Tous les menus</span>
        </div>
        {ListeCategory.map((cat) => (
          <Category
            key={cat.id}
            {...cat}
            isActive={CategoryID === cat.id}
            onClick={() => setCategoryID(cat.id)}
          />
        ))}
      </div>

      <main className="products-grid">
        {filteredProduits.length > 0 ? (
          filteredProduits.map((pd, index) => (
            <Produit 
              key={index} 
              {...pd} 
            />
          ))
        ) : (
          <div className="no-results">
            <i className="fas fa-utensils"></i>
            <h3>Aucun plat trouvé</h3>
            <p>Essayez de modifier votre recherche ou de changer de catégorie.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

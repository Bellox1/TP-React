# Projet 
créer une application qui liste  des produits et permettant de rechercher des produits avec un filtre par catégorie. 
Si lors de la recherche aucun produit ne correspond au text saisi vous afficher "aucun produit trouvé".
Si il y a un filtre appliqué la recherche ne doit s'appliquer que sur les éléments filtrés.

# Documentation Technique : Système de Recherche

Ce document explique en détail le fonctionnement du moteur de recherche implémenté dans `App.tsx`.

## Analyse ligne par ligne de la logique de recherche

La recherche s'appuie sur le hook `useMemo` pour filtrer dynamiquement la liste des produits. Voici le détail :

```tsx
const filteredProduits = useMemo(() => {
  return ListeProduit.filter((produit) => {
    // LIGNE A : Filtrage par catégorie
    const matchCategory = CategoryID === 0 || produit.IdCategory === CategoryID;
    
    // LIGNE B : Filtrage par texte (Recherche)
    const matchSearch = produit.nom.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        produit.desc.toLowerCase().includes(searchQuery.toLowerCase());
    
    // LIGNE C : Intersection des deux filtres
    return matchCategory && matchSearch;
  });
}, [CategoryID, searchQuery]);
```

### Pourquoi ces lignes ?

#### 1. `const [searchQuery, setSearchQuery] = useState<string>("");`
- **Quoi** : Création d'une variable d'état pour le texte de recherche.
- **Pourquoi** : En React, pour qu'un champ de saisie (`input`) soit interactif et que l'interface réagisse à chaque lettre tapée, on doit stocker la valeur dans un "état". Cela permet de déclencher un nouveau rendu dès que l'utilisateur écrit.

#### 2. `useMemo(() => { ... }, [CategoryID, searchQuery])`
- **Quoi** : Hook de mémoisation.
- **Pourquoi** : Le filtrage est une opération de calcul. `useMemo` garantit que ce calcul ne s'exécute **que** si la recherche (`searchQuery`) ou la catégorie (`CategoryID`) change. Cela évite de recalculer inutilement la liste si d'autres parties de l'application (comme le mode sombre ou une animation) se mettent à jour.

#### 3. `matchCategory = CategoryID === 0 || produit.IdCategory === CategoryID;` (Ligne A)
- **Quoi** : Vérification de la catégorie.
- **Pourquoi** : 
    - `CategoryID === 0` : Si l'utilisateur a choisi "Tous", on accepte tous les produits.
    - `produit.IdCategory === CategoryID` : Sinon, on ne garde que ceux dont l'ID correspond au filtre. 
    - **Le but** : Permettre de cumuler la recherche textuelle avec le filtre de catégorie.

#### 4. `.toLowerCase().includes(searchQuery.toLowerCase())` (Ligne B)
- **Quoi** : Comparaison de texte.
- **Pourquoi** : 
    - `.toLowerCase()` : On transforme tout en minuscules pour que la recherche soit **insensible à la casse** (ex: taper "burg" ou "Burg" donnera le même résultat).
    - `.includes()` : On vérifie si le mot clé se trouve n'importe où dans le nom **OU** la description. Cela rend la recherche plus flexible et intuitive pour l'utilisateur.

#### 5. `return matchCategory && matchSearch;` (Ligne C)
- **Quoi** : Condition finale.
- **Pourquoi** : C'est l'essence de la consigne : la recherche ne doit s'appliquer que sur les éléments déjà filtrés par catégorie. L'opérateur `&&` (ET) impose que le produit respecte les **deux** critères simultanément.

#### 6. `filteredProduits.length > 0 ? (...) : (<div className="no-results">...</div>)`
- **Quoi** : Rendu conditionnel.
- **Pourquoi** : Si après filtrage la liste est vide, React affiche automatiquement le message "Aucun plat trouvé". C'est crucial pour l'expérience utilisateur, afin qu'il ne reste pas face à une page blanche sans comprendre pourquoi.

---

## Conclusion
Cette implémentation est **déclarative** : on définit les règles de filtrage, et React s'occupe de garder l'interface à jour automatiquement dès que l'utilisateur interagit avec la barre de recherche ou les catégories.
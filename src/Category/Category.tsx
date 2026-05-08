export interface ICategory {
  id: number;
  nom: string;
  img: string;
  isActive?: boolean;
  onClick?: () => void;
}

function Category(props: ICategory) {
  const { nom, img, isActive, onClick } = props;

  return (
    <div 
      className={`category-pill ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <img src={img} alt={nom} />
      <span>{nom}</span>
    </div>
  );
}

export default Category;


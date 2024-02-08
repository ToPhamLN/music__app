import React from "react";
import style from "~/styles/Sidebar.module.css";

const ItemListBar: React.FC = () => {
  return (
    <div className={style.item__list}>
      <div className={style.icon}>
        <img
          src="https://res.cloudinary.com/dohywtebw/image/upload/v1694691530/blog-app/tehprwmyyyiukuoojo7k.jpg"
          alt="Poster List"
        />
      </div>
      <span className={style.name__item}>playlist name vertical</span>
    </div>
  );
};

export default ItemListBar;

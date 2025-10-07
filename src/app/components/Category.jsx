import React from'react';
import Image from 'next/image';
import styles from '../styles/Category.module.css';

const Category = () => {
    return (
        <div className={styles.categorySection}>
            <div className={styles.categoryItem}>
                <div className={styles.iconContainer}>
                    <Image
                        src="/images/Eventos.png" 
                        alt="Eventos"
                        fill
                        className={styles.categoryIcon}
                    />
                </div>
                <p className={styles.categoryName}>Eventos</p>
            </div>
            <div className={styles.categoryItem}>
                <div className={styles.iconContainer}>
                    <Image
                        src="/images/exclusivo.png"
                        alt="Exclusivo"
                        fill
                        className={styles.categoryIcon}
                    />
                </div>
                <p className={`${styles.categoryName} ${styles.exclusivoName}`} >Exclusivo</p>
            </div>
            <div className={styles.categoryItem}>
                <div className={styles.iconContainer}>
                    <Image
                        src="/images/passes.png"
                        alt="Passes"
                        fill
                        className={styles.categoryIcon}
                    />
                </div>
                <p className={styles.categoryName}>Passes</p>
            </div>
            <div className={styles.categoryItem}>
                <div className={styles.iconContainer}>
                    <Image
                        src="/images/skins.png"
                        alt="Skins"
                        fill
                        className={styles.categoryIcon}
                    />
                </div>
                <p className={styles.categoryName}>Skins</p>
            </div>
            <div className={styles.categoryItem}>
                <div className={styles.iconContainer}>
                    <Image
                        src="/images/armas.png"
                        alt="Armas"
                        fill
                        className={styles.categoryIcon}
                    />
                </div>
                <p className={styles.categoryName}>Armas</p>
            </div>
            <div className={styles.categoryItem}>
                <div className={styles.iconContainer}>
                    <Image
                        src="/images/acessorios.png"
                        alt="Acessórios"
                        fill
                        className={styles.categoryIcon}
                    />
                </div>
                <p className={styles.categoryName}>Acessórios</p>
            </div>
        </div>
    );
};

export default Category;

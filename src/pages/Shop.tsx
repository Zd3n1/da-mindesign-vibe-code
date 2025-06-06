
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    id: "1",
    name: "Ceramic Vase",
    price: "58",
    imageUrl: "https://images.unsplash.com/photo-1631125915902-d8abe9225ff2?q=80&w=2787&auto=format&fit=crop",
    category: "Ceramics"
  },
  {
    id: "2",
    name: "Frosted Glass Tumbler",
    price: "24",
    imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop",
    category: "Glassware"
  },
  {
    id: "3",
    name: "Natural Wax Candle",
    price: "38",
    imageUrl: "https://images.unsplash.com/photo-1674479019774-21a23e8f065e?q=80&w=2788&auto=format&fit=crop",
    category: "Candles"
  },
  {
    id: "4",
    name: "Ceramic Mug Set",
    price: "42",
    imageUrl: "https://images.unsplash.com/photo-1657946874620-afab95fd7505?q=80&w=2787&auto=format&fit=crop",
    category: "Ceramics"
  },
  {
    id: "5",
    name: "Modern Plant Pot",
    price: "32",
    imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800&auto=format&fit=crop",
    category: "Ceramics"
  },
  {
    id: "6",
    name: "Glass Carafe",
    price: "48",
    imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop",
    category: "Glassware"
  },
  {
    id: "7",
    name: "Scented Soy Candle",
    price: "28",
    imageUrl: "https://www.ikea.com/cz/en/images/products/svartoxbaer-scented-candle-in-glass-mimosa-yellow__1383402_pe962546_s5.jpg?q=80&w=800&auto=format&fit=crop",
    category: "Candles"
  },
  {
    id: "8",
    name: "Ceramic Bowl Set",
    price: "56",
    imageUrl: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
    category: "Ceramics"
  }
];

const Shop = () => {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const collection = searchParams.get('collection');
    setActiveCollection(collection);
    
    if (collection) {
      // Convert collection to regular category format if needed
      let category = collection.charAt(0).toUpperCase() + collection.slice(1);
      if (category === "Kitchen" || category === "Textiles" || category === "Decor") {
        // These don't have direct product matches, show all products
        setFilteredProducts(products);
      } else {
        setFilteredProducts(products.filter(p => 
          p.category.toLowerCase() === collection.toLowerCase()
        ));
      }
    } else {
      setFilteredProducts(products);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container py-12">
          <h1 className="text-2xl md:text-3xl font-medium mb-8">
            {activeCollection 
              ? `${activeCollection.charAt(0).toUpperCase() + activeCollection.slice(1)} Collection` 
              : 'All Products'}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No products found in this collection.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;

import "./newProduct.css";
import { useDispatch } from "react-redux"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addProduct } from "../../redux/apiCalls";
import { useState } from "react";
import app from "../../firebase";

export default function NewProduct() {

   const [ inputs, setInputs ] = useState({}); 
   const [ file, setFile ] = useState(null);
   const [ cate, setCate ] = useState([]);

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  };

  const handleCate = (e) => {
    setCate(e.target.value.split(","))
  };

  const createProduct = (e) => {
    e.preventDefault();

    const filename = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, filename);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      console.log(error)
    }, 
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: downloadURL, categories: cate };
          addProduct(product, dispatch)
        });
      }
    );
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" name="title" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" name="desc" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input type="text" name="price" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="" onChange={handleCate}/>
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onClick={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button className="addProductButton" onClick={createProduct}>Create</button>
      </form>
    </div>
  );
}

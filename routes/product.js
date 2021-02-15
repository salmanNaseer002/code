const express = require("express");
const router = express.Router();

const {
    create,
    productById,
    read,
    read1,
    remove,
    update,
    updateSale,
    removeSale,
    list,
    listRelated,
    listCategories,
    listBySearch,
    photo,
    listSearch,
    createReview ,
    listproducts,
} = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");


router.get("/product/:productId", read);
router.get("/product", read1);
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
    "/product/:productId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.put(
    "/product/:productId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);
router.put(
    "/sales/:productId/:price/:percentage/:date/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    updateSale,
);
router.put(
    "/salesRemove/:productId/:price/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    removeSale
);
router.get("/products/list/:userId", requireSignin, isAuth, isAdmin, listproducts);
router.get("/products", list);
router.get("/products/search", listSearch);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);

//router.put("/:id/reviews",requireSignin, isAuth, createReview); 



router.post('/reviews/:productId/:userId',requireSignin,isAuth,createReview);
     
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
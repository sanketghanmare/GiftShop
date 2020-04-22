import store from '../store';

export async function OnSubmitLogin(form) {

    console.log("In form");
    console.log(form);
    console.log(store.getState());
    let data = store.getState().login;
    if (data.username.length === 0 || data.password.length === 0 || data.role.length === 0) {
        alert('Please enter your Credentials');
        return;
    }
    fetch(
        `/login/username/${data.username}/password/${data.password}/role/${data.role}`,
        {
            method: 'GET',
        }).then(response => response.json())
        .then(async (res) => {
            if (res !== "error") {
                data.authenticated = true;
                //store.dispatch(res)
                console.log("ok");
                console.log(res);
                store.dispatch(userdetails(res));
                store.dispatch(login(data));
                if (data.role === "Seller") {
                    getMyGifts();
                    getCategories();
                    getAllOrdersForSeller();
                }
                if (data.role === "Admin") {
                    await getCategories();
                    await getAllUsers();
                    await getAllGifts();
                }
                if (data.role === "Buyer") {
                    await getCategories();
                    await GetMyCartItems();
                    await getAllDeliveredOrdersForBuyer();
                }

                form.redirect("/" + data.role)

            } else {
                form.setError('Username/Password does not match')
                alert("Username/Password does not match")
            }
        })

}

function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary)
}

export async function subscribe(sellerId) {
    let buyerId = store.getState().userdetails.get(0)._id;
    console.log(buyerId, sellerId)

    fetch(`/buyer/${buyerId}/subscribe/${sellerId}`, {
        method: 'POST'
    }).then(response => response.json()).then(res => {
        store.dispatch({
                           type: 'ADD_SUBSCRIPTION',
                           data: res
                       })
    })
}

export async function addToGiftBasket(gift) {

    let data = store.getState().userdetails;

    console.log(gift);
    console.log(data.get(0)._id);
    await fetch(`/buyer/giftbasket/create`, {
        method: 'POST',
        body: JSON.stringify({
                                 buyer: data.get(0)._id,
                                 gift: gift._id,
                                 quantity: gift.quantity
                             }), headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json()).then(async (res) => {

        await GetMyBasketItem(res._id)
    })

}

export async function GetMyBasketItem(basketid) {

    fetch(`/basketid/${basketid}/giftCart/`,
          {
              method: 'GET',
          }).then(response => response.json()).then(async (res) => {
        console.log(res)

        fetch(`/basketid/${basketid}/giftCart/`,
              {
                  method: 'GET',
              }).then(response => response.json()).then(async (res) => {
            console.log(res)
            res[0]['imageData'] = await getImage(res[0].gift.imageName)
            console.log(res);
            store.dispatch({
                               type: "ADD_TO_GIFT_BASKET",
                               data: res
                           })
        })
    })
}

export async function getMyGifts() {
    console.log(store.getState());
    let sellerId = store.getState().userdetails.get(0)._id;
    console.log(sellerId);
    let result = {};
    await fetch(`/seller/mygifts/${sellerId}`, {
        method: 'GET',
    }).then(response => response.json())
        .then(res => result = res);
    console.log("result");
    console.log(result);
    console.log("printing sizze " + result.length)

    for (let i = 0; i < result.length; i++) {
        console.log("inside fr");
        console.log(result[i]);
        if (result[i].imageName) {
            result[i]['imageData'] = await getImage(result[i].imageName);
            //console.log()
            console.log(result)
            store.dispatch({
                               type: 'GET_GIFTS',
                               data: result
                           })
        }

        /*   await fetch(`/seller/gift/image/${result[i].imageName}`, {
             method : 'GET'
           }).then(response => response.json())
           .then( (img1) =>{ result[i].imageName = 'data:image/jpeg;base64,'+ arrayBufferToBase64(img1.data)
             store.dispatch({
               type:'GET_GIFTS',
               data:result
             })
           })*/
    }

    console.log("after ");
    console.log(result)

    /*    console.log("getting my gifts")
        console.log(result)*/

    //})

}

export async function deleteUser(userId, role) {

    console.log(userId, role)
    await fetch(`/admin/user/delete/${userId}/${role}`, {
        method: 'DELETE',
    }).then(response => response.json()).then(res => {
        store.dispatch({
                           type: 'DELETE_USER',
                           id: userId

                       })
    })
}

export async function deleteGift(giftId) {
    console.log("gift being removed ")
    console.log(giftId)
    await fetch(`/seller/gift/delete/${giftId}`, {
        method: 'DELETE',
    }).then(response => response.json()).then(response => {
        console.log(response);
        store.dispatch({
                           type: 'DELETE_GIFT',
                           id: giftId
                       })
    })
    // await getMyGifts();
    console.log("After delete", store.getState())
}

export async function addSeller(user) {

  console.log(user);
    if(typeof user === 'undefined' || user.firstName.length === 0 || user.lastName.length === 0 || user.password.length === 0
       || user.role.length === 0 || user.street1.length === 0 || user.State.length === 0 || user.city.length === 0) {
        alert('Please provide all the details!!')
      return;
    }


    await fetch(`/admin/seller/create`, {
        method: 'POST',
        body: JSON.stringify({
                                 firstName: user.firstName,
                                 lastName: user.lastName,
                                 username: user.username,
                                 password: user.password,
                                 role: user.role,
                                 street1: user.street1,
                                 street2: user.street2,
                                 city: user.city,
                                 State: user.State,
                                 zip: user.zip,
                                 subscribers: user.subscribers
                             }),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json()).then(res => {
        store.dispatch({
                           type: 'ADD_USER',
                           data: res
                       })
    })
}

/*export async function addGift(gift) {
  console.log(gift)
  let sellerId = store.getState().userdetails._id;
  console.log(sellerId);
  let giftId = '';
  const imageObj = new FormData();
  imageObj.append("imageName", "upload" + Date.now())
  imageObj.append("imageData",gift.image)

  await fetch("/seller/gift/create", {
    method : 'POST',
    body : JSON.stringify({
          name : gift.name,
          deliveryInDays : gift.delivery,
          imageName : null,
          availableQuantity : gift.availability,
          Seller : sellerId
    }),
    headers : {
      'content-type' : 'application/json'
    }
  }).then(response => response.json())
  .then(giftId =>
   fetch(`/seller/gift/image/${giftId}`, {
     method : 'POST',
     body : imageObj,
   }).then(response => response.json()).then(res => console.log(res)));

    await getMyGifts();
}*/

export async function editProfile(userId, user) {
  console.log(user)
  // if(!(user.isPasswordChanged && user.password.length > 0)){
  //   delete user.password
  // }

  await fetch(`/user/edit/profile/${userId}`, {
    method : 'POST',
    body : JSON.stringify({
      firstName : user.firstName,
      lastName : user.lastName,
      username : user.username,
      role : user.role,
      street1 : user.street1,
      street2 : user.street2,
      city : user.city,
      State : user.State,
      zip : user.zip,
      cardType : user.cardType,
      cardNumber: user.cardNumber,
      cvc:user.cvc,
      password : user.password
    }),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json()).then(async (res) => { console.log(res , "updated user response");
    await store.dispatch({
      type: 'EDIT_USER',
      data: res
    })
  })
}


export async function editUser(userId, user) {

  console.log(user)
    await fetch(`/admin/user/edit/${userId}`, {
        method: 'POST',
        body: JSON.stringify({
                                 firstName: user.firstName,
                                 lastName: user.lastName,
                                 username: user.username,
                                 role: user.role,
                                 street1: user.street1,
                                 street2: user.street2,
                                 city: user.city,
                                 State: user.State,
                                 zip: user.zip,
                                 cardNumber: user.cardNumber,
                                 cvc: user.cvc,
                                 oldRole: user.oldRole
                             }),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json()).then(async (res) => {
        console.log(res, "updated user response");
        await store.dispatch({
                                 type: 'EDIT_USER',
                                 data: res
                             })
    })
}

export async function editGifts(giftId, gift) {
    console.log("about to edit")
    console.log(gift)
    console.log(giftId)

  if(gift.name.length === 0 || gift.deliveryInDays.length === 0 || gift.availableQuantity.length === 0 || gift.price.length === 0 || gift.category.length === 0) {
    alert("Please enter all the details")
    return;
  }



    if (gift.isImageChanged) {
        if(gift.imageName.length === 0){
          alert('Please upload an Image');
          return ;
        }

        let imageId = await updateImage(gift.imageName)
        gift.imageName = imageId;
        console.log(gift)
    }

    await fetch(`/seller/gift/edit/${giftId}`, {
        method: 'POST',
        body: JSON.stringify({
                                 name: gift.name,
                                 deliveryInDays: gift.deliveryInDays,
                                 imageName: gift.imageName,
                                 availableQuantity: gift.availableQuantity,
                                 category: gift.category,
                                 Seller: gift.Seller,
                                 price: gift.price
                             }),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json()).then(async (res) => {
        console.log(res);
        res['imageData'] = await getImage(res.imageName);
        await store.dispatch({
                                 type: 'EDIT_GIFT',
                                 data: res
                             })
    })

}

export async function getImage(imageName) {
    let imageData = {};
    await fetch(`/seller/gift/image/${imageName}`, {
        method: 'GET'
    }).then(response => response.json()).then((img1) => {
        imageData = 'data:image/jpeg;base64,' + arrayBufferToBase64(img1.data)
    });

    return imageData;
}

export async function getCartImage(imageName) {
    let imageData = {};
    await fetch(`/seller/gift/image/${imageName}`, {
        method: 'GET'
    }).then(response => response.json()).then((img1) => {
        imageData = 'data:image/jpeg;base64,' + arrayBufferToBase64(img1.data)
    });

    return imageData;
}

export async function updateImage(imageName) {
    let imageId = '';
    const imageObj = new FormData();
    imageObj.append("imageName", "upload" + Date.now())
    imageObj.append("imageData", imageName)
    await fetch(`/seller/gift/image`, {
        method: 'POST',
        body: imageObj,
    }).then(response => response.json()).then(res => imageId = res)
    console.log("new image uploaded", imageId)
    return imageId;

}

//Admin
export async function getAllGifts() {
    await fetch(`/admin/allgifts`, {
        method: 'GET',
    }).then(response => response.json()).then(async (res) => await store.dispatch({
                                                                                      type: "GET_GIFTS",
                                                                                      data: res
                                                                                  }))
}

// export async function getUserById(userId){
//   await fetch(`/admin/users/${userId}`,{method:"GET",}).then(response.json())
//       .then(async(res)=>await store.dispatch({
//         type: "GET_SELECTED_USER",
//         data:res
//       }))
// }

export async function getAllUsers() {
    await fetch(`/admin/allusers`, {
        method: 'GET',
    }).then(response => response.json()).then(async (res) => await store.dispatch({
                                                                                      type: "GET_USERS",
                                                                                      data: res

                                                                                  }))
}

export async function deleteCategory(categoryName) {
    console.log(categoryName);
    await fetch(`/admin/category/delete/${categoryName}`, {
        method: 'DELETE'
    }).then(response => response.json())
        .then(res => {
            console.log("after deletion", res)
            store.dispatch({
                               type: 'DELETE_CATEGORY',
                               data: categoryName
                           })
        })
}

//admin - edit category
export async function editCategory(categoryName, category) {
    console.log(category, categoryName)
    await fetch(`/admin/category/edit/${categoryName}`, {

        method: 'PUT',
        body: JSON.stringify({
                                 categoryName: category.categoryName,
                                 catType: category.catType,
                                 parentCategory: category.parentCategory
                             }),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json()).then(async (res) =>
                                                  await store.dispatch({
                                                                           type: 'EDIT_CATEGORY',
                                                                           data: res
                                                                       })
    )
}

// admin - add category
export async function addCategory(category) {
    console.log(category)
    await fetch(`/admin/category/create`, {
        method: 'POST',
        body: JSON.stringify({
                                 categoryName: category.categoryName,
                                 catType: category.catType,
                                 parentCategory: category.parentCategory
                             }),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
        .then(res =>
                  store.dispatch({
                                     type: 'CREATE_CATEGORY',
                                     data: res
                                 })
        )
}

//seller - add gift
export async function addGifts(gift) {
    console.log(gift)
    if(gift.image.length === 0){
      alert('Please add the image');
      return;
    }

    if(gift.name.length === 0 || gift.delivery.length === 0 || gift.availability.length === 0 || gift.price.length === 0 || gift.category.length === 0){
      alert("Please enter all the details")
      return;
    }

    console.log("in new add gifts")
    console.log(gift)
    let sellerId = store.getState().userdetails.get(0)._id;
    console.log(sellerId);
    let giftId = '';
    let newGift = {};
    const imageObj = new FormData();
    imageObj.append("imageName", "upload" + Date.now())
    imageObj.append("imageData", gift.image)
    await fetch(`/seller/gift/image`, {
        method: 'POST',
        body: imageObj,
    }).then(response => response.json()).then(res =>
                                                  fetch("/seller/gift/create", {
                                                      method: 'POST',
                                                      body: JSON.stringify({
                                                                               name: gift.name,
                                                                               deliveryInDays: gift.delivery,
                                                                               imageName: res,
                                                                               availableQuantity: gift.availability,
                                                                               Seller: sellerId,
                                                                               category: gift.category,
                                                                               price: gift.price
                                                                           }),
                                                      headers: {
                                                          'content-type': 'application/json'
                                                      }
                                                  })).then(response => response.json())
        .then(async (res) => {
            console.log(res);
            res['imageData'] = await getImage(res.imageName)
            await store.dispatch({
                                     type: "ADD_GIFT",
                                     data: res
                                 })
            //newGift = res;
        })

    // .then(fetch(`/seller/gift/image/${newGift.imageName}`, {
    //   method : 'GET'
    // }).then(response => response.json()).then(img1 => {
    //                                       newGift.imageName = 'data:image/jpeg;base64,'+
    // arrayBufferToBase64(img1.data); console.log(newGift); store.dispatch({ type: "ADD_GIFT",
    // data : newGift } ) })) await getMyGifts();

}

// seller - all products
export async function getAllProducts() {
    console.log("GET_PRODUCTS");

    fetch('/buyer/getAllProducts/',
          {
              method: 'GET',
          }).then(response => response.json())
        .then(res => {
            console.log(res)
            store.dispatch({
                               type: 'GET_GIFTS',
                               data: res
                           })
        })

}

export async function GetMyCartItems() {

    let id = store.getState().userdetails.get(0)._id;

    fetch(`/buyer/${id}/giftCart/`,
          {
              method: 'GET',
          }).then(response => response.json()).then(async (res) => {
        if (res.length > 0) {
            console.log(res);
            for (let j = 0; j < res.length; j++) {
                res[j]['imageData'] = await getCartImage(res[j].gift.imageName)
            }
            console.log("with image data", res);

            store.dispatch({
                               type: "ADD_TO_GIFT_BASKET",
                               data: res
                           })
        }
    })

}

//
export async function GetGifts(gift) {
    console.log("GetGifts");
    console.log(gift.gender());
    if (gift.gender().length) {
        fetch(`/buyer/searchgifts/gender/${gift.gender()}`,
              {
                  method: 'GET',
              }).then(response => response.json())
            .then(res => {
                console.log(res)
                store.dispatch({
                                   type: 'GET_GIFTS',
                                   data: res
                               })
            })
    }

}

export function login(data) {
    return {
        type: "LOGIN",
        data: data
    }
}

export function logout(data) {
    console.log("in logout")
    console.log(data)
    data.username = ''
    data.password = ''
    data.role = ''
    data.authenticated = false
    console.log(data);
    store.dispatch(
        {
            type: "CLEAR",
            data: {}
        })
    store.dispatch(
        {
            type: "LOGOUT",
            data
        });

}

export async function getCategories() {
    await fetch(
        `/categories`,
        {
            method: 'GET',
        }).then(response => response.json())
        .then(async (res) => {
            await store.dispatch({
                                     type: 'GET_CATEGORIES',
                                     data: res
                                 })
        })
}

export function userdetails(data) {
    return ({type: "USER_DETAILS", data});
}

//buyer
export async function getGiftsByCategories(categories) {
    let result = [];
    await fetch(`/buyer/gifts/${categories}`, {
        method: 'GET'
    }).then(response => response.json()).then(res => {
        result = res;
    })
    console.log(result);
    for (let j = 0; j < result.length; j++) {
        if (result[j].imageName) {
            result[j]['imageData'] = await getImage(result[j].imageName);
            //console.log()
            console.log(result)

        }
    }
    store.dispatch({
                       type: 'SEARCH_GIFTS',
                       data: result
                   })
    //console.log(result);
}

export async function setDeleteGiftFromCart(basketid) {

    console.log(basketid);
    await fetch(`/buyer/basket/${basketid}`, {
        method: 'DELETE'
    }).then(response => response.json()).then(res => {
        store.dispatch({
                           type: 'DELETE_GIFT_FROM_CART',
                           id: basketid
                       })
    })
}

//buyer getSubscriptions

export async function getSubscriptions() {
    let buyerId = store.getState().userdetails.get(0)._id;
    await fetch(`/buyer/subscribers/${buyerId}`, {
        method: 'GET'
    }).then(response => response.json()).then(res => {
        console.log(res)
        store.dispatch({
                           type: 'GET_SUBSCRIPTIONS',
                           data: res
                       })
    })
}

//buyer unSubscribe

export async function getSubscribers() {
    let buyerId = store.getState().userdetails.get(0)._id;
    await fetch(`/buyer/subscribers/${buyerId}`, {
        method: 'GET'
    }).then(response => response.json()).then(res => {
        console.log(res)
        store.dispatch({
                           type: 'GET_SUBSCRIPTIONS',
                           data: res
                       })
    })
}

//buyer unSubscribe

export async function unSubscribe(sellerId) {
    let buyerId = store.getState().userdetails.get(0)._id;
    await fetch(`/buyer/subscribers/${buyerId}/unsubscribe/${sellerId}`, {
        method: 'POST'
    }).then(response => response.json()).then(res => {
        store.dispatch({

                           type: 'UNSUBSCRIBE',
                           data: res
                       })
        console.log(res)
    })
}

//buyer getNotification
export async function getNotifications() {
    let buyerId = store.getState().userdetails.get(0)._id;
    let gifts = [];
    console.log(buyerId)
    await fetch(`/buyer/notifications/${buyerId}`, {
        method: 'GET'
    }).then(response => response.json()).then(res => {
        console.log("Notifications: ", res)
        for (let j = 0; j < res.length; j++) {
            gifts.push(res[j])
        }
    })

    if (gifts.length > 0) {
        console.log("notifications before : ", gifts)
        for (let i = 0; i < gifts.length; i++) {
            gifts[i]['imageData'] = await getImage(gifts[i].newGift.imageName);
        }

        store.dispatch({
                           type: 'MY_NOTIFICATIONS',
                           data: gifts
                       })
    }
}

export async function deleteNotification(notificationId) {
    console.log(notificationId)
    await fetch(`/buyer/notifications/delete/${notificationId}`, {
        method: 'DELETE'
    }).then(response => response.json()).then(res => {
        store.dispatch({
                           type: 'DELETE_NOTIFICATION',
                           id: notificationId
                       })
    })
}

// if(gifts.length > 0 ) {
//
//   for (let i = 0; i < gifts.length; i++) {
//     gifts[i]['imageData'] = getImage(gifts[i].imageName);
//   }
//
//   console.log("new gifts ", gifts);
//
//   store.dispatch({
//     type: 'My_NOTIFICATIONS',
//     data: gifts
//   })
// }

//
// <<<<<<< HEAD
//     console.log(res);
//     await store.dispatch({
//         type:'DELETE_ALL_FROM_CART',
//     data:{}
//   })
//    await store.dispatch({
//      type:'ADD_ORDER',
//          data:res
//         })
//   }
//   )
// =======
// //buyer Checkout
// >>>>>>> 3e2b6a0c9acee19fd4086d6b7fb4596a5e529520

export async function confirmCheckout(state, deliveryAddress) {

    console.log(state);
    let gifts = state.GiftBasketList;
    let seller = [];
    let quantity = [];
    let giftId = [];
    let deliveryInDay = [];
    let giftBasketId = [];
    console.log(gifts)
    for (let j = 0; j < gifts.length; j++) {
        seller.push(gifts[j].value.gift.Seller);
        quantity.push(gifts[j].value.quantity);
        giftId.push(gifts[j].value.gift._id);
        deliveryInDay.push(gifts[j].value.gift.deliveryInDays)
        giftBasketId.push(gifts[j].value._id)
    }
    console.log("seller", seller)
    console.log("quantity", quantity)
    console.log("GiftIds", giftId)
    console.log("DeliveryInDay", deliveryInDay);

    await fetch(`/buyer/order/create`, {
        method: 'POST',
        body: JSON.stringify({
                                 seller: seller,
                                 quantity: quantity,
                                 giftId: giftId,
                                 deliveryInDay: deliveryInDay,
                                 buyer: gifts[0].value.buyer,
                                 total: state.total,
                                 deliverAddress: deliveryAddress,
                                 giftBasketId: giftBasketId
                             }
        ),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json()).then(async (res) => {

                                                  console.log(res);
                                                  await store.dispatch({
                                                                           type: 'DELETE_ALL_FROM_CART',
                                                                           data: {}
                                                                       })
                                                  await store.dispatch({
                                                                           type: 'ADD_ORDER',
                                                                           data: res
                                                                       })
                                              }
    )

    //console.log(store.getState().shoppingCart)
}

export async function getAllOrdersForBuyer() {

    let buyerId = store.getState().userdetails.get(0)._id;

    fetch(`/buyer/${buyerId}/orders`, {
        method: 'GET'
    }).then(response => response.json()).then(async (res) => {
                                                  console.log("Orders for buyer", res);
                                                  store.dispatch({
                                                                     type: "GET_ORDERS",
                                                                     data: res
                                                                 })
                                              }
    )

    // fetch(`/buyer/${buyerId}/orders`, {
    //     method: 'GET'
    // }).then(response => response.json()).then(async (res) => {
    //     console.log(res);
    //     if (res.length > 0) {
    //         console.log( res);
    //         for (let j = 0; j < res.length; j++) {
    //             res[j]['imageData'] = await getImage(res[j].orderDetails[j].gift.imageName)
    //         }
    //         console.log("with image data", res);
    //
    //         store.dispatch({
    //                            type: "GET_ORDERS",
    //                            data: res
    //                        })
    //     }
    //  }
    // );

}

export async function getAllOrdersForSeller() {
    console.log("getting orders for seller");
    let sellerId = store.getState().userdetails.get(0)._id;

    await fetch(`/seller/${sellerId}/orders`, {
        method: 'GET'
    }).then(response => response.json()).then(async (res) =>
                                                  await store.dispatch({
                                                                           type: "GET_ORDERS_SELLER",
                                                                           data: res
                                                                       })
    )
}

export async function changeOrderDetailStatus(state) {
    let orderDetailId = state.order_id;
    let status = state.status;

    await fetch(`/seller/order/${orderDetailId}/status/${status}/update`, {
        method: 'POST'
    }).then(response => response.json()).then(async (res) => {
        //console.log(res)
        await store.dispatch({
                                 type: "UPDATE_ORDER_SELLER",
                                 data: res
                             })

    })

}

export async function getAllDeliveredOrdersForBuyer() {

    let buyerId = store.getState().userdetails.get(0)._id;

    fetch(`/buyer/${buyerId}/deliveredorders`, {
        method: 'GET'
    }).then(response => response.json()).then(async (res) => {
                                                  store.dispatch({
                                                                     type: "GET_ORDERS",
                                                                     data: res
                                                                 })
                                              }
    )

}







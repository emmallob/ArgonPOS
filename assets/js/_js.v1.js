const iName = "argonPOS-db",
    iVer = 1;
var companyVariables = $.parseJSON($('link[rel="params"]').attr("_cl"));
$(".overlay").css("display", "block");
const menuItems = $(".left-sidenav ul.metismenu"),
    menuItemsPlaceholder = $(".menu-items-placeholder");
menuItemsPlaceholder.show(), $(() => {
    $('[data-toggle="tooltip"]').tooltip(), $(".overlay").css("display", "none")
});
const Toast = Swal.mixin({
    toast: !0,
    position: "top",
    showConfirmButton: !1,
    timer: 6e3,
    onOpen: t => {
        t.addEventListener("mouseenter", Swal.stopTimer), t.addEventListener("mouseleave", Swal.resumeTimer)
    }
});
var internetCheck, recon, sL = () => {
        menuItems.show(), menuItemsPlaceholder.hide(), $(".main-content-loader.main-body-loader").css({
            display: "flex"
        })
    },
    hL = () => {
        $(".main-content-loader.main-body-loader").css({
            display: "none"
        }), menuItemsPlaceholder.hide(), menuItems.show()
    },
    noInternet = !1,
    offlineValue = $('div[class="offline-check"]').attr("offline-value");

function cOS() {
    var t = (window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB).open(iName, iVer);
    t.onupgradeneeded = function(t) {
        $.each({
            users: "user_id",
            request_products: "product_id",
            branches: "branch_id",
            quotes: "request_id",
            orders: "request_id",
            customers: "customer_id",
            requests: "request_id",
            payment_types: "payment_type_id",
            sales: "order_id",
            payment_types: "id",
            settings: "this_key",
            reports: "reports_id"
        }, function(e, a) {
            "reports" == e ? t.currentTarget.result.createObjectStore(e, {
                keyPath: a,
                autoIncrement: !0
            }) : t.currentTarget.result.createObjectStore(e, {
                keyPath: a,
                autoIncrement: !1
            }).createIndex(a, a, {
                unique: !0
            })
        })
    }, t.onsuccess = function() {}
}
async function dPv(t) {
    await listIDB(t).then(e => {
        var a = jsDate("fulldate");
        $.each(e, function(e, s) {
            s.today_date != a && del(t, s.order_id).then(t => {})
        })
    })
}
function listIDB(t) {
    return new Promise((e, a) => {
        var s = (window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB).open(iName, iVer);
        s.onsuccess = function() {
            var a, n = s.result,
                o = n.transaction(t, "readwrite");
            o.objectStore(t).getAll().onsuccess = (t => {
                a = t.target.result, e(a)
            });
            o.oncomplete = function() {
                n.close()
            }
        }
    })
}

function upIDB(t, e) {
    return new Promise((a, s) => {
        var n = (window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB).open(iName, iVer);
        n.onsuccess = function() {
            var s, o = n.result.transaction(t, "readwrite").objectStore(t);
            try {
                $.each(e, function(t, e) {
                    s = o.put(e)
                })
            } catch (t) {
                t.name
            }
            s.onsuccess = function(t) {
                a(200)
            }, s.onerror = function() {}
        }
    })
}

function aIDB(t, e) {
    return new Promise((a, s) => {
        var n = (window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB).open(iName, iVer);
        n.onsuccess = function() {
            var s, o = n.result.transaction(t, "readwrite").objectStore(t);
            try {
                $.each(e, function(t, e) {
                    s = o.add(e)
                })
            } catch (t) {
                t.name
            }
            s.onsuccess = function(t) {
                a(200)
            }, s.onerror = function() {}
        }
    })
}

function clearDBStore(t) {
    return new Promise((e, a) => {
        var s = (window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB).open(iName, iVer);
        s.onsuccess = function() {
            var a, n = s.result.transaction(t, "readwrite").objectStore(t);
            try {
                a = n.clear()
            } catch (t) {
                throw t.name, t
            }
            a.onsuccess = function(t) {
                e(200)
            }, a.onerror = function() {}
        }
    })
}

function updateUsersRecordIndexDb(t) {
    return new Promise((e, a) => {
        var s = (window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB).open(iName, iVer);
        s.onsuccess = function() {
            var a, n = s.result.transaction("users", "readwrite").objectStore("users");
            try {
                $.each(t, function(t, e) {
                    a = n.put(e)
                })
            } catch (t) {
                t.name
            }
            a.onsuccess = function(t) {
                e(200)
            }, a.onerror = function() {}
        }
    })
}

function deleteUserFromIndexDb(t) {
    return new Promise((e, a) => {
        var s = (window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB).open(iName, iVer);
        s.onsuccess = function() {
            var a, n = s.result.transaction("users", "readwrite").objectStore("users");
            try {
                var o = {
                    user_id: t,
                    deleted: 1
                };
                a = n.put(o)
            } catch (t) {
                throw t.name, t
            }
            a.onsuccess = function(t) {
                e(200)
            }, a.onerror = function() {}
        }
    })
}

function del(t, e) {
    return new Promise((a, s) => {
        var n = (window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB).open(iName, iVer);
        n.onsuccess = function() {
            var s = n.result,
                o = s.transaction(t, "readwrite");
            o.objectStore(t).delete(e).onsuccess = (t => {
                a(200)
            });
            o.oncomplete = function() {
                s.close()
            }
        }
    })
}

function sPIDB() {
    return new Promise((t, e) => {
        new Array;
        var a = "error",
            s = 0,
            n = 0,
            o = 0,
            r = jsDate(),
            l = randomInt(13),
            c = `INV${randomInt(13)}`,
            i = $('select[name="customer"]').val(),
            d = parseFloat($('input[name="amount_paying"]').val()),
            u = parseFloat($('span[class="total-to-pay-amount"]').attr("data-order-total")).toFixed(2),
            p = parseFloat($('span[class="total-to-pay-amount"]').attr("data-order-total")),
            m = $('select[name="payment_type"]').val(),
            h = $('h6[class~="selected-customer-name"] h3').text(),
            f = $('input[name="discount_type"]:checked').val();
        s = $('input[name="discount_amount"]').val().length > 0 ? parseFloat($('input[name="discount_amount"]').val()) : 0, "credit" == m ? (n = 1, 0, o = u) : (d, o = d - u), u -= "cash" == f ? s : s = parseFloat(s / 100 * u).toFixed(2);
        var y = companyVariables._ud,
            v = companyVariables._un,
            b = companyVariables._clb,
            g = companyVariables._cl,
            w = [],
            _ = 0;
        $.each($('tbody[class="products-table-body"] tr[class="products-row"] input'), function(t, e) {
            var a = $(this).attr("data-row"),
                s = $(this).val(),
                n = $(this).attr("data-name"),
                o = $(`input[name="products[${a}][price]"]`).val();
            if (void 0 !== a && !1 !== a) {
                var l = s * o,
                    i = `${randomString(20)}`;
                w.push({
                    id: randomInt(12),
                    auto_id: i,
                    product_title: n,
                    clientId: g,
                    branchId: b,
                    order_id: c,
                    product_id: a,
                    product_quantity: s,
                    product_unit_price: o,
                    product_total: l,
                    order_date: r
                }), _ += l
            }
        });
        var x = [{
            clientId: g,
            source: "Evelyn",
            branchId: b,
            mode: "offline",
            order_id: c,
            customer_id: i,
            customer_name: h,
            customer_fullname: h,
            customer_contact: "",
            saleItems: w,
            ordered_by_id: i,
            recorded_by: y,
            sale_team_name: v,
            credit_sales: n,
            order_amount_paid: d,
            overall_order_amount: p + s,
            order_amount_balance: o,
            order_discount: s,
            order_date: r,
            order_status: "confirmed",
            payment_type: m,
            transaction_id: l
        }];
        parseFloat(_).toFixed(2);
        if (w.length < 1) "Sorry! You have not selected any products.";
        else {
            var T = (window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB).open(iName, iVer);
            T.onsuccess = function() {
                var e, s = T.result.transaction("sales", "readwrite").objectStore("sales");
                try {
                    $.each(x, function(t, a) {
                        e = s.add(a)
                    })
                } catch (t) {
                    t.name
                }
                e.onsuccess = function(e) {
                    t({
                        status: a = "success",
                        result: "Payment Recorded",
                        orderId: c
                    })
                }, e.onerror = function() {
                    t({
                        status: a,
                        result: "Error processing request"
                    })
                }
            }
        }
    })
}

function gIDBR(t, e) {
    return new Promise((a, s) => {
        var n = (window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB).open(iName, iVer);
        n.onsuccess = function() {
            var s, o = n.result,
                r = o.transaction(t, "readwrite");
            r.objectStore(t).get(e).onsuccess = (t => {
                s = t.target.result, a(s)
            });
            r.oncomplete = function() {
                o.close()
            }
        }
    })
}

function isNumber(t) {
    var e = (t = t || window.event).which ? t.which : t.keyCode;
    return !(e > 31 && (e < 48 || e > 57) && 46 != e)
}
async function dOC() {
    return $.ajax({
        url: `${baseUrl}users/onlineCheck`,
        type: "POST",
        data: {
            onlineCheck: !0
        },
        timeout: 5e3
    })
}

function reConnect() {
    $('div[class~="offline-placeholder"] button[type="button"]').on("click", async function() {
        $('div[class~="offline-placeholder"] button[type="button"]').html('Reconnecting &nbsp; <i class="fa fa-spin fa-spinner"></i>').css({
            display: "inline-flex"
        }), $('div[class~="offline-placeholder"] button[type="button"]').prop("disabled", !0), $('div[class~="offline-placeholder"] button[type="reset"]').removeClass("hidden"), recon = setInterval(function() {
            dOC().then(t => {
                1 == t ? (clearInterval(recon), noInternet = !1, $('div[class="connection-lost"]').css("display", "none"), $('div[class~="offline-placeholder"] div[class~="offline-content"] p').html(""), $('div[class="connection-restored"]').css("display", "block"), $('div[class~="offline-placeholder"] button[type="reset"]').addClass("hidden"), $('div[class~="offline-placeholder"] button[type="button"]').html("Connection Restored").removeClass("btn-warning").addClass("btn-success"), $('div[class~="offline-placeholder"] button[type="button"]').prop("disabled", !1), setTimeout(function() {
                    window.location.href = ""
                }, 2e3)) : ($('div[class~="offline-placeholder"]').css({
                    display: "flex"
                }), $('div[class~="offline-placeholder"] button[type="button"]').html('Reconnecting &nbsp; <i class="fa fa-spin fa-spinner"></i>').css({
                    display: "inline-flex"
                }), $('div[class~="offline-placeholder"] button[type="button"]').prop("disabled", !1))
            }).catch(t => {
                $('div[class~="offline-placeholder"]').css({
                    display: "flex"
                }), $('div[class~="offline-placeholder"] button[type="button"]').html('Reconnecting &nbsp; <i class="fa fa-spin fa-spinner"></i>').css({
                    display: "inline-flex"
                }), $('div[class~="offline-placeholder"] button[type="button"]').prop("disabled", !0)
            })
        }, 3e3)
    }), $('div[class~="offline-placeholder"] button[type="reset"]').on("click", function() {
        $('div[class~="offline-placeholder"] button[type="reset"]').addClass("hidden"), $('div[class~="offline-placeholder"] button[type="button"]').html("Reconnect"), $('div[class~="offline-placeholder"] button[type="button"]').prop("disabled", !1), clearInterval(recon)
    })
}
cOS(), $('table[class~="simple-table"]').dataTable({
    iDisplayLength: 5
}), dOC().then(t => {
    1 == t ? (noInternet = !1, $('div[class="connection"]').css("display", "none")) : (noInternet = !0, $('div[class="connection"]').css("display", "block"))
}).catch(t => {
    noInternet = !0, $('div[class="connection"]').css("display", "block")
}), reConnect();
var syncOfflineData = async t => {
        await listIDB(t).then(e => {
            e.length > 0 && $.post(baseUrl + `doprocess_db/sync/${t}`, {
                syncData: e
            }, function(t) {
                t.status
            }, "json")
        })
    },
    preloadData = async t => {
        $.ajax({
            url: `${baseUrl}doprocess_db/preloadData`,
            data: {
                preloadData: !0,
                dataType: t
            },
            dataType: "json",
            type: "post",
            success: function(e) {
                if (200 == e.status)
                    if ("reports" == e.request) {
                        var a = e.result;
                        $.each(a, function(t, e) {
                            upIDB("reports", e)
                        })
                    } else upIDB(t, e.result)
            }
        })
    };

function show_modal(t) {
    $("#owner_div").css("display", "none"), $("#account_owner").val(""), $(".form-result").html(""), $(`#${t}`).modal("show")
}

function delI() {
    $('div[class="form-result"]').html(""), $('div[class="main-content"]').on("click", 'button[class~="delete-item"], a[class~="delete-item"]', function(t) {
        let e = $(this).attr("data-id"),
            a = $(this).attr("data-msg"),
            s = $(this).attr("data-url"),
            n = $(this).attr("data-request");
        $('div[id="deleteData"] form[class="submitThisForm"]').attr("action", s), $('div[id="deleteData"] input[name="itemToDelete"]').val(n), $('div[id="deleteData"] input[name="itemId"]').val(e), $('div[id="deleteData"] div[class~="details-pane"]').html(a), $('div[class~="delete-modal"]').modal("show")
    })
}

function inputController() {
    $('input[class~="input_ctrl"]').on("input", function(t) {
        let e = $(this).attr("data-row-value"),
            a = $(`input[id="product_quantity_${e}"]`).val(),
            s = $(`input[id="product_price_${e}"]`).val(),
            n = parseInt(a) * parseInt(s);
        $(`span[data-row-value="${e}"]`).html(formatCurrency(n)), $(`input[id="product_price_${e}"]`).parents("tr").hasClass("selected") && $(`button[data-row-value="${e}"]`).html("Update").addClass("btn-primary update-button").removeClass("btn-success")
    })
}

function dismissModal(t, e) {
    $('div[class="main-content"]').on("click", 'button[class~="dismiss-modal"]', function() {
        let t = $(this).attr("data-modal");
        $(`#${t}`).modal("hide"), $(`#${t} form`).length && $(`#${t} form`)[0].reset(), $('div[class="form-result"]').html(""), "productsListModalWindow" == t && setTimeout(function() {
            $('body[class~="main-body"]').addClass("modal-open")
        }, 1e3)
    })
}
$(function() {
    $('select[class~="selectpicker"]').select2({
        width: "100%"
    }), $('select[class~="selectpicker2"]').select2({
        width: "100%"
    })
}), delI();
var populateRequestsList = (t, e) => {
        $(`table[id="${e}"]`).dataTable().fnDestroy(), $(`table[id="${e}"]`).dataTable({
            aaData: t,
            iDisplayLength: 10,
            buttons: ["copy", "print", "csvHtml5"],
            lengthChange: !1,
            dom: "Bfrtip",
            columns: [{
                data: "row_id"
            }, {
                data: "request_id"
            }, {
                data: "branch_name"
            }, {
                data: "customer_name"
            }, {
                data: "quote_value"
            }, {
                data: "recorded_by"
            }, {
                data: "request_date"
            }, {
                data: "action"
            }]
        }), delI(), hL()
    },
    discountCalculator = () => {
        $('input[name="discount_type"]').on("change", function() {
            $('input[name="discount_amount"]').val("")
        }), $('input[name="discount_amount"]').on("input", function() {
            let t = $(this).val(),
                e = $('input[name="discount_type"]:checked').val(),
                a = parseFloat($('span[class="subtotal-total"]').attr("data-subtotal")),
                s = 0;
            t.length > 0 && ("cash" == e ? (t > a && (t = a, $('input[name="discount_amount"]').val(a)), s = parseFloat(t)) : "percentage" == e && (t > 100 && (t = 100, $('input[name="discount_amount"]').val(100)), s = parseFloat(t) / 100 * a));
            let n = parseFloat(a - s).toFixed();
            $('span[class="discount_total"]').attr("data-discount_total", s).html(s.toFixed(2)), $('span[class="overalltotal"]').attr("data-overalltotal", n).html(formatCurrency(n)), $("td[data-overalltotal]").attr("data-overalltotal", n)
        })
    };
if ($('table[class~="productsList"]').length) {
    $('div[class="main-content"]').on("click", 'a[class~="add-category"]', function(t) {
        $('input[name="category_name"]').val(""), $('input[name="categoryId"]').val(""), $('input[name="request"]').val("add"), $('div[class~="categoryModal"]').modal("show")
    }), $('div[class~="categoryModal"] button[type="submit"]').on("click", function() {
        let t = $('input[name="category_name"]').val(),
            e = $('input[name="categoryId"]').val(),
            a = $('input[name="request"]').val();
        $('div[class="form-content-loader"]').css("display", "none"), $.post(baseUrl + "aj/categoryManagement/saveCategory", {
            name: t,
            id: e,
            dataset: a
        }, t => {
            200 == t.status ? ($('div[class~="categoryModal"]').modal("hide"), Toast.fire({
                type: "success",
                title: t.message
            }), $('div[class="form-content-loader"]').css("display", "none"), listProductCategories()) : (Toast.fire({
                type: "error",
                title: t.message
            }), $('div[class="form-content-loader"]').css("display", "none"))
        }, "json").catch(t => {
            Toast.fire({
                type: "error",
                title: "Error Processing Request"
            }), $('div[class="form-content-loader"]').css("display", "none")
        })
    });
    var populateCategoryList = t => {
        hL(), $('table[class~="productsList"]').dataTable().fnDestroy(), $('table[class~="productsList"]').dataTable({
            aaData: t,
            iDisplayLength: 10,
            buttons: ["copy", "print", "csvHtml5"],
            lengthChange: !1,
            dom: "Bfrtip",
            columns: [{
                data: "row"
            }, {
                data: "category"
            }, {
                data: "products_count"
            }, {
                data: "action"
            }]
        }), delI(), $('div[class="main-content"]').on("click", 'a[class~="edit-category"]', function(t) {
            $(this).data("id");
            let e = $(this).data("content");
            $('input[name="category_name"]').val(e.category), $('input[name="categoryId"]').val(e.id), $('input[name="request"]').val("update"), $('div[class~="categoryModal"]').modal("show")
        })
    };

    function listProductCategories() {
        $.ajax({
            method: "POST",
            url: `${baseUrl}aj/categoryManagement/listProductCategories`,
            data: {
                listProductCategories: !0
            },
            dataType: "JSON",
            success: function(t) {
                populateCategoryList(t.result)
            },
            complete: function(t) {
                hL()
            },
            error: function(t) {
                hL()
            }
        })
    }
    listProductCategories()
}
async function listRequests(t, e) {
    if (sL(), await dOC().then(t => {
            1 == t ? (noInternet = !1, $('div[class="connection"]').css("display", "none")) : (noInternet = !0, $('div[class="connection"]').css("display", "block"))
        }).catch(t => {
            noInternet = !0, $('div[class="connection"]').css("display", "block")
        }), noInternet) return await listIDB(`${t.toString().toLowerCase()}s`).then(t => {
        populateRequestsList(t, `${e}`)
    }), !1;
    $.ajax({
        method: "POST",
        url: `${baseUrl}aj/listRequests`,
        data: {
            listRequests: "true",
            requestType: t
        },
        dataType: "JSON",
        beforeSend: function() {},
        success: function(a) {
            populateRequestsList(a.result, `${e}`), upIDB(`${t.toString().toLowerCase()}s`, a.result)
        },
        complete: function(t) {
            inputController(), hL()
        },
        error: function(t) {
            hL()
        }
    })
}

function removeItem(t) {
    $('div[class="main-content"]').on("click", 'span[class~="remove-item"]', function(e) {
        var a = $(this).attr("data-value"),
            s = $(this).attr("data-sum");
        $.ajax({
            type: "POST",
            url: `${baseUrl}doprocess_sales/removeItem`,
            data: {
                removeItem: "true",
                sessionName: t,
                productId: a
            },
            dataType: "JSON",
            success: function(t) {},
            complete: function(t) {
                $(`tr[data-row="${a}"]`).remove();
                let e = $("td[data-overall]").attr("data-total"),
                    n = parseInt(e) - parseInt(s);
                $("td[data-overall]").attr("data-total", n), $('span[class="overall-total"]').html(formatCurrency(n))
            }
        })
    })
}

function serealizeSelects(t) {
    var e = [];
    return t.each(function() {
        e.push($(this).val())
    }), e
}

function formatCurrency(t) {
    var e = !1;
    return t < 0 && (e = !0, t = Math.abs(t)), (e ? "-" : "") + parseFloat(t, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString()
}

function randomInt(t = 10) {
    for (var e = "", a = "0123456789".length, s = 0; s < t; s++) e += "0123456789".charAt(Math.floor(Math.random() * a));
    return e
}

function randomString(t) {
    for (var e = "", a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", s = a.length, n = 0; n < t; n++) e += a.charAt(Math.floor(Math.random() * s));
    return e
}

function jsDate(t = "datetime") {
    var e = new Date,
        a = "" + (e.getMonth() + 1),
        s = "" + e.getDate(),
        n = e.getFullYear(),
        o = e.getHours(),
        r = e.getMinutes(),
        l = e.getSeconds();
    return a.length < 2 && (a = "0" + a), s.length < 2 && (s = "0" + s), "datetime" == t ? [n, a, s].join("-") + " " + [o, r, l].join(":") : "fulldate" == t ? [n, a, s].join("-") : void 0
}

function htmlEntities(t) {
    return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}

function stripHtml(t) {
    return t.replace(/(<([^>]+)>)/gi, "")
}
$(".send-to-list div:last").css({
    "border-radius": "0px 5px 5px 0px",
    "margin-right": "0px"
}), $('div[class="main-content"]').on("click", 'a[class~="logout"]', async function(t) {
    t.preventDefault();
    var e = $(this).attr("data-value");
    $(this).attr("href");
    await dOC().then(t => {
        1 == t ? (offline = !1, $('div[class="connection"]').css("display", "none")) : (offline = !0, $('div[class="connection"]').css("display", "block"))
    }).catch(t => {
        offline = !0, $('div[class="connection"]').css("display", "block")
    }), offline && ($('div[class~="clearCache"]').modal("show"), $('button[class~="confirm-clear-cache"]').on("click", function(t) {
        caches.delete("argonPOS-Static-v1").then(t => {
            window.location.href = baseUrl
        })
    })), $.ajax({
        type: "POST",
        url: `${baseUrl}al/dLg`,
        data: {
            doLogout: !0,
            toPerform: e
        },
        dataType: "json",
        success: function(t) {
            200 == t.status && (window.location.href = baseUrl)
        }
    })
});
var populateCustOptionsList = t => {
        $('select[class~="customer-select"]').find("option").remove().end(), $('span[class="hide-walk-in-customer"]').length ? $('select[class~="customer-select"]').append('<option value="null" data-contact="No Contact" selected="selected">-- Select Customer --</option>') : $('select[class~="customer-select"]').append('<option value="WalkIn" data-prefered-payment="" data-contact="No Contact" selected="selected">Walk In Customer</option>'), $.each(t, function(t, e) {
            $('select[class~="customer-select"]').append(`<option data-prefered-payment='${e.preferred_payment_type}' data-email='${e.email}' data-contact='${e.phone_1}' value='${e.customer_id}'>${e.fullname} (${e.phone_1})</option>`)
        })
    },
    fetchPOSCustomersList = async() => {
        if (await dOC().then(t => {
                1 == t ? (noInternet = !1, $('div[class="connection"]').css("display", "none")) : (noInternet = !0, $('div[class="connection"]').css("display", "block"))
            }).catch(t => {
                noInternet = !0, $('div[class="connection"]').css("display", "block")
            }), noInternet) {
            await listIDB("customers").then(t => {
                var e = 0,
                    a = [];
                $.each(t, function(t, s) {
                    1 != s.deleted && (e++, s.row_id = e, a.push(s))
                }), populateCustOptionsList(a)
            });
            return !1
        }
        await syncOfflineData("customers").then(t => {
            $.post(baseUrl + "aj/fetchCustomersOptionsList", {
                fetchCustomersOptionsList: !0
            }, async function(t) {
                await clearDBStore("customers").then(e => {
                    populateCustOptionsList(t.result), upIDB("customers", t.result)
                })
            }, "json")
        })
    };
$('select[class~="customer-select"]').length && fetchPOSCustomersList();
var triggerCellClick = () => {
        $(".product-title-cell").on("click", function(t) {
            let e = $(this).siblings("td").find(".checkbox input:checkbox");
            e.prop("checked", !e.is(":checked")), e.trigger("change")
        })
    },
    populatePOSProductsList = t => {
        let e = "";
        $.each(t, function(t, a) {
            var s, n = `<div class="checkbox checkbox-primary checkbox-single">\n                <input type="checkbox" name="products[${a.product_id}][id]" value="${a.product_id}" data-product_max="${a.product_quantity}" class="product-select d-block" id="productCheck-${a.product_id}" data-product-id="${a.product_id}" data-product-name="${a.product_title}" data-product-price="${a.price}" data-product-img="${a.image}">\n                <label for="productCheck-${a.product_id}">\n                </label>\n            </div>`;
            a.product_quantity < 1 ? (n = "", s = 'class="text-danger" title="Out of Stock"') : s = `title="${a.product_quantity} Stock Quantity Left"`, e += `<tr ${s} data-toggle="tooltip" id="productCheck-${a.product_id}" data-product-id="${a.product_id}" data-product-name="${a.product_title}" data-product-price="${a.price}" data-product-img="${a.image}" style="transition: all 0.8s ease" data-category="${a.category_id}" data-product_max="${a.product_quantity}">\n            <td>\n                ${n}\n            </td>\n            <td><img class="product-title-cell" src="${a.image}" width="24px"></td>\n            <td class="product-title-cell" style="cursor:pointer">${a.product_title}</td>\n            <td>${a.price}</td>\n        </tr>`
        }), $('tbody[class="pos-products-list"]').html(e), $('tr[data-toggle="tooltip"]').tooltip(), triggerCellClick(), initialiteProductSelect()
    },
    fetchPOSProductsList = async() => {
        if (await dOC().then(t => {
                1 == t ? (noInternet = !1, $('div[class="connection"]').css("display", "none")) : (noInternet = !0, $('div[class="connection"]').css("display", "block"))
            }).catch(t => {
                noInternet = !0, $('div[class="connection"]').css("display", "block")
            }), noInternet) {
            await listIDB("request_products").then(t => {
                var e = 0,
                    a = [];
                $.each(t, function(t, s) {
                    1 != s.deleted && (e++, s.row_id = e, a.push(s))
                }), populatePOSProductsList(a)
            });
            return !1
        }
        $.post(baseUrl + "aj/fetchPOSProductsList", {
            fetchPOSProductsList: !0
        }, async function(t) {
            await clearDBStore("request_products").then(e => {
                upIDB("request_products", t.result).then(e => {
                    populatePOSProductsList(t.result)
                })
            })
        }, "json")
    };
$('tbody[class="pos-products-list"]').length && fetchPOSProductsList();
var populateUsersList = t => {
        $('table[class~="usersAccounts"]').dataTable().fnDestroy(), $('table[class~="usersAccounts"]').dataTable({
            aaData: t,
            iDisplayLength: 10,
            buttons: ["copy", "print", "csvHtml5"],
            lengthChange: !1,
            dom: "Bfrtip",
            columns: [{
                data: "row_id"
            }, {
                data: "fullname"
            }, {
                data: "branch_name"
            }, {
                data: "access_level"
            }, {
                data: "contact"
            }, {
                data: "email"
            }, {
                data: "registered_date"
            }, {
                data: "action"
            }]
        }), editUserDetails(), editUserAccessLevel(), deleteUserDetails(), hL()
    },
    fetchUsersLists = async() => {
        if ($("table[class~='usersAccounts']").length) {
            if (sL(), await dOC().then(t => {
                    1 == t ? (noInternet = !1, $('div[class="connection"]').css("display", "none")) : (noInternet = !0, $('div[class="connection"]').css("display", "block"))
                }).catch(t => {
                    noInternet = !0, $('div[class="connection"]').css("display", "block")
                }), noInternet) {
                await listIDB("users").then(t => {
                    var e = 0,
                        a = [];
                    $.each(t, function(t, s) {
                        1 != s.deleted && (e++, s.row_id = e, a.push(s))
                    }), populateUsersList(a)
                });
                return hL(), !1
            }
            $.ajax({
                url: baseUrl + "aj/userManagement/fetchUsersLists",
                type: "POST",
                data: {
                    fetchUsersLists: !0
                },
                dataType: "json",
                cache: !1,
                beforeSend: function() {
                    sL()
                },
                success: function(t) {
                    populateUsersList(t.message), aIDB("users", t.message)
                },
                error: function() {},
                complete: function() {}
            })
        }
    };
async function deleteMyItem(t, e, a = "") {
    if ("" != t && "" != e) {
        if (await dOC().then(t => {
                1 == t ? (noInternet = !1, $('div[class="connection"]').css("display", "none")) : (noInternet = !0, $('div[class="connection"]').css("display", "block"))
            }).catch(t => {
                noInternet = !0, $('div[class="connection"]').css("display", "block")
            }), noInternet && "evUser" == e) {
            await deleteUserFromIndexDb(t).then(t => {
                $(".show-delete-msg").html('<p class="alert alert-success text-white">\n                        User Have Been Successfully Deleted.\n                    </p>'), setTimeout(function() {
                    $(".show-delete-msg").empty(), $('div[class~="deleteModal"]').modal("hide")
                }, 1500), fetchUsersLists()
            });
            return !1
        }
        $.ajax({
            url: baseUrl + "doprocess_deletedata",
            type: "POST",
            data: {
                request: "deleteMyData",
                delete_id: t,
                page: e,
                page: e
            },
            dataType: "json",
            cache: !1,
            beforeSend: function() {
                $(".show-delete-msg").html('\n                    <p class="text-center"><span class="fa fa-spinner fa-spin"></span><br>Please Wait...</p>\n                '), $(".confirm-delete-btn").hide()
            },
            success: function(t) {
                1 == t.status ? $(".show-delete-msg").html(`<p class="alert alert-success text-white">${t.message}</p>`) : ($(".show-delete-msg").html(`<p class="alert alert-danger text-white">${t.message}</p>`), $(".confirm-delete-btn").fadeIn(1e3))
            },
            error: function() {
                $(".show-delete-msg").html('<p class="alert alert-success">Error Processing Request</p>'), $(".confirm-delete-btn").fadeIn(1e3)
            },
            complete: function() {
                setTimeout(function() {
                    $(".show-delete-msg").empty()
                }, 3e3)
            }
        })
    }
}
fetchUsersLists(), $('form[class~="submitThisForm"]').on("submit", async function(t) {
    if (t.preventDefault(), confirm("Do you want to submit this form?")) {
        if ($('div[class="form-content-loader"]').css("display", "flex"), await dOC().then(t => {
                1 == t ? (noInternet = !1, $('div[class="connection"]').css("display", "none")) : (noInternet = !0, $('div[class="connection"]').css("display", "block"))
            }).catch(t => {
                noInternet = !0, $('div[class="connection"]').css("display", "block")
            }), noInternet) {
            if ("branches" == $('input[name="this-form"]').val()) {
                a = "update-record" == $('input[name="record_type"]').val() ? $('input[name="branchId"]').val() : randomString(12);
                let t = $('input[name="status"]').val(),
                    s = $('select[name="branchType"]').val(),
                    n = `<br><span class='badge ${"Store"==s?"badge-primary":"badge-success"}'>${s}</span>`,
                    o = `<div width="100%" align="center">\n                    <button class="btn btn-sm btn-outline-success edit-branch" data-branch-id="${a}">\n                            <i class="mdi mdi-pencil-outline"></i>\n                        </button>\n                    <button class="btn btn-sm "${1==t?"btn-outline-danger":"btn-outline-primary"}" delete-item" data-url="${baseUrl}aj/branchManagment/updateStatus" data-state="${t}" data-msg="${1==t?"Are you sure you want to set the {$data->branch_name} as inactive?":"Do you want to proceed and set the {$data->branch_name} as active?"}" data-request="branch-status" data-id="${a}">\n                            <i class="fa ${1==t?"fa-stop":"fa-play"}"></i>\n                        </button> </div>`,
                    r = $('input[name="branchName"]').val();
                if (r.length < 3) $(".form-result").html('<p class="alert alert-danger text-white">Branch name cannot be empty.</p>');
                else {
                    let l = $('input[name="location"]').val();
                    var e = [{
                        branch_id: a,
                        contact: $('input[name="phone"]').val(),
                        branch_name: r + n,
                        location: l,
                        email: $('input[name="email"]').val(),
                        branch_type: s,
                        status: `<div align='center'>${1==t?"<span class='badge badge-success'>Active</span>":"<span class='badge badge-danger'>Inactive</span>"}</div>`,
                        branch_name_text: r,
                        action: o
                    }];
                    await upIDB("branches", e).then(t => {
                        200 == t ? ($(".form-result").html('\n                                <p class="alert alert-success text-white">Branch Have Been Successfully Registered.</p>\n                            '), "new-record" == $('[name="record_type"]').val() && $(".submitThisForm:visible")[0].reset(), fetchBranchLists(), setTimeout(function() {
                            $(".form-result").empty(), $('div[id="newModalWindow"]').modal("hide")
                        }, 2e3)) : $(".form-result").html('<p class="alert alert-danger text-white">Error encountered while processing request.</p>')
                    })
                }
                return $('div[class="form-content-loader"]').css("display", "none"), !1
            }
            if ("users" == $('input[name="this-form"]').val()) {
                var a, s = `\n                    <div class='text-center'><button class="btn btn-sm btn-outline-success edit-user" data-user-id="${a="update-record"==$('input[name="record_type"]').val()?$('input[name="user_id"]').val():randomString(12)}">\n                            <i class="mdi mdi-pencil-outline"></i>\n                    </button>\n                    <button class="btn btn-sm btn-outline-danger delete-user" data-user-id="${a}">\n                        <i class="mdi mdi-trash-can"></i>\n                    </button></div>`;
                e = [{
                    user_id: a,
                    access_level_id: $('select[name="access_level"]').val(),
                    access_level: $('select[name="access_level"]').children("option:selected").attr("data-name"),
                    fullname: $('input[name="fullName"]').val(),
                    email: $('input[name="email"]').val(),
                    contact: $('input[name="phone"]').val(),
                    branchId: $('select[name="branchId"]').val(),
                    branch_name: $('select[name="branchId"]').children("option:selected").attr("data-name"),
                    gender: $('select[name="gender"]').val(),
                    registered_date: jsDate(),
                    action: s
                }];
                return "update-record" != $('input[name="record_type"]').val() ? await aIDB("users", e).then(t => {
                    200 == t ? ($("form[class~='submitThisForm']")[0].reset(), $(".form-result").html('\n                                <p class="alert alert-success text-white">User Have Been Successfully Registered.</p>\n                            '), setTimeout(function() {
                        $(".form-result").empty(), fetchUsersLists()
                    }, 2e3)) : console.log("Ooops!!!!")
                }) : await updateUsersRecordIndexDb(e).then(t => {
                    200 == t ? ($("form[class~='submitThisForm']")[0].reset(), $(".form-result").html('\n                                <p class="alert alert-success text-white">User Have Been Successfully Updated.</p>\n                            '), setTimeout(function() {
                        $(".form-result").empty(), fetchUsersLists()
                    }, 3e3)) : console.log("Ooops!!!!")
                }), $('div[class="form-content-loader"]').css("display", "none"), !1
            }
        }
        $.ajax({
            url: $(this).attr("action"),
            type: "POST",
            data: $(this).serialize(),
            dataType: "json",
            success: function(t) {
                1 == t.status ? (Toast.fire({
                    type: "success",
                    title: t.message
                }), "new-record" == $('[name="record_type"]').val() && $(".submitThisForm:visible")[0].reset(), fetchUsersLists(), fetchBranchLists(), $('table[class~="productsList"]').length && listProductCategories(), $('table[class~="customersList"]').length && listCustomers(), "Quote" != t.thisRequest && "Order" != t.thisRequest || listRequests(t.thisRequest, t.tableName)) : Toast.fire({
                    type: "error",
                    title: t.message
                })
            },
            error: function(t) {
                Toast.fire({
                    type: "error",
                    title: "Error Processing Request"
                }), $('div[class="form-content-loader"]').css("display", "none")
            },
            complete: function(t) {
                $('div[class~="delete-modal"]').modal("hide"), setTimeout(function() {
                    $(".form-result").empty()
                }, 1200), $('div[class="form-content-loader"]').css("display", "none"), $(".submit-form").prop("disabled", !1)
            }
        })
    }
});
var populateUserDetails = t => {
        $('[name="fullName"]').val(t.fullname), $('[name="access_level"]').val(t.access_level_id).change(), $('[name="gender"]').val(t.gender).change(), $('[name="phone"]').val(t.contact), $('[name="email"]').val(t.email), $('[name="branchId"]').val(t.branchId).change(), $('[name="userId"]').val(t.user_id), $('[name="record_type"]').val("update-record"), $('[name="weekly_target"]').val(t.weekly_target), $('[name="daily_target"]').val(t.daily_target), $('[name="monthly_target"]').val(t.monthly_target), $("#newModalWindow").modal("show")
    },
    editUserDetails = () => {
        $('div[class="main-content"]').on("click", ".edit-user", async function(t) {
            t.preventDefault(), sL();
            var e = $(this).data("user-id");
            if (await dOC().then(t => {
                    1 == t ? (noInternet = !1, $('div[class="connection"]').css("display", "none")) : (noInternet = !0, $('div[class="connection"]').css("display", "block"))
                }).catch(t => {
                    noInternet = !0, $('div[class="connection"]').css("display", "block")
                }), noInternet) {
                await gIDBR("users", e).then(t => (populateUserDetails(t), !1));
                return hL(), !1
            }
            "" != e && $.ajax({
                url: baseUrl + "aj/userManagement/getUserDetails",
                data: {
                    getUserDetails: !0,
                    userId: e
                },
                dataType: "json",
                type: "POST",
                cache: !1,
                success: function(t) {
                    1 == t.status ? populateUserDetails(t.message) : Toast.fire({
                        type: "error",
                        title: "User there was an error while fetching user information."
                    })
                },
                error: function(t) {},
                complete: function(t) {
                    hL()
                }
            })
        })
    },
    editUserAccessLevel = () => {
        $('div[class="main-content"]').on("click", 'button[class~="edit-access-level"]', function(t) {
            t.preventDefault();
            var e = $(this).data("user-id");
            "" != e && $.ajax({
                url: baseUrl + "aj/userManagement/permissionManagement",
                data: {
                    getUserAccessLevels: !0,
                    user_id: e
                },
                dataType: "json",
                type: "POST",
                cache: !1,
                beforeSend: function() {
                    $('div[class~="launchModal"] div[class~="show-modal-title"]').html("Edit User Access Level"), $('div[class~="launchModal"] div[class~="show-modal-body"]').html('<div class="col-12"><div class="card"><div class="card-body"><p class="text-center"><span class="fa fa-spinner fa-spin"></span></p></div></div></div>')
                },
                success: function(t) {
                    if (1 == t.status) {
                        $('div[class~="launchModal"]').modal("show");
                        var a = '\n                        <div class="row"><div class="settings-form-msg col-12"></div>';
                        $.each(t.message.permissions, function(t, e) {
                            var s = null;
                            a += `\n                            <div class="col-md-4 col-sm-6">\n                                <div class="card">\n                                    <div class="card-body">\n                                        <h5 class="mt-0">${t[0].toUpperCase()+t.slice(1)}</h5>\n                                        <div class="general-label">`;
                            var n = 0;
                            $.each(e, function(e, o) {
                                n++, s = 1 == o ? "checked" : null, a += `\n                                <div class="form-group row">\n                                    <div class="col-12">\n                                        <div class="checkbox my-2">\n                                            <div class="custom-control custom-checkbox">\n                                                <input data-value="${o}" data-name="${t.toString().toLowerCase()},${e.toString().toLowerCase()}" ${s} type="checkbox" class="custom-control-input user-access-levels" id="customCheck_${t}_${n}" data-parsley-multiple="groups" data-parsley-mincheck="2">\n                                                <label class="custom-control-label" for="customCheck_${t}_${n}">${e[0].toUpperCase()+e.slice(1)}</label>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>`
                            }), a += "</div></div></div></div>"
                        }), a += `\n                        </div>\n                        <div class="col-12 mb-3">\n                            <button data-user-id="${e}" class="btn btn-primary float-right access-level-submit-btn">\n                                Save Settings\n                            </button>\n                        </div>\n                        `, $('div[class~="launchModal"] div[class~="show-modal-body"]').html(a)
                    } else Toast.fire({
                        type: "error",
                        title: t.message
                    })
                },
                error: function() {
                    Toast.fire({
                        type: "error",
                        title: "Error Processing Request"
                    })
                },
                complete: function() {
                    saveAccessLevelSettings()
                }
            })
        })
    };

function deleteUserDetails() {
    $('div[class="main-content"]').on("click", ".delete-user", function(t) {
        t.preventDefault();
        var e = $(this).data("user-id");
        "" != e && ($(".show-delete-body").html("Do You Want To Proceed In Deleting This User?"), $(".confirm-delete-btn").show().attr("onclick", `deleteMyItem("${e}", "evUser", fetchUsersLists())`), $(".deleteModal").modal("show"))
    })
}
$('div[class="main-content"]').on("change", '[name="access_level"]', function(t) {
    t.preventDefault();
    var e = $('[name="access_level"]').val();
    $.ajax({
        url: baseUrl + "aj/userManagement",
        type: "POST",
        data: {
            request: "fetchAccessLevelPermissions",
            access_level: e
        },
        dataType: "json",
        cache: !1,
        beforeSend: function() {
            $(".permissions-row").html('\n                <div class="col-12">\n                    <div class="card">\n                        <div class="card-body">\n                            <p class="text-center">\n                                <span class="fa fa-spinner fa-spin"></span>\n                            </p>\n                        </div>\n                    </div>\n                </div>\n            ')
        },
        success: function(t) {
            if (1 == t.status) {
                var e = "";
                $.each(t.message.permissions, function(t, a) {
                    var s = null;
                    e += `\n                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6">\n                        <div class="card">\n                            <div class="card-body">\n                                <h5 class="mt-0">${t[0].toUpperCase()+t.slice(1)}</h5>\n                                <div class="general-label">`;
                    var n = 0;
                    $.each(a, function(a, o) {
                        n++, s = 1 == o ? "checked" : null, e += `\n                        <div class="form-group row">\n                            <div class="col-12">\n                                <div class="checkbox my-2">\n                                    <div class="custom-control custom-checkbox">\n                                        <input data-value="${o}" data-name="${t.toString().toLowerCase()},${a.toString().toLowerCase()}" ${s} type="checkbox" class="custom-control-input user-access-levels" id="customCheck_${t}_${n}" data-parsley-multiple="groups" data-parsley-mincheck="2">\n                                        <label class="custom-control-label" for="customCheck_${t}_${n}">${a[0].toUpperCase()+a.slice(1)}</label>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>`
                    }), e += "\n                                </div>\n                            </div>\n                        </div>\n                    </div>"
                }), e += '\n                <div class="col-12 mb-3">\n                    <button class="btn btn-primary float-right access-level-submit-btn">\n                        Save Settings\n                    </button>\n                </div>\n                ', $(".permissions-row").html(e)
            } else $(".permissions-row").html(`\n                    <div class="col-12">\n                        <div class="card">\n                            <div class="card-body">\n                                <p class="alert alert-danger">${t.message}</p>\n                            </div>\n                        </div>\n                    </div>\n                `)
        },
        error: function() {
            $(".settings-form-msg").html('\n                <p class="alert alert-danger">Error Processing Request</p>\n            ')
        },
        complete: function() {
            setTimeout(function() {
                $(".settings-form-msg").empty()
            }, 3e3)
        }
    })
});
var saveAccessLevelSettings = () => {
    $('div[class="main-content"]').on("click", ".access-level-submit-btn", function(t) {
        if (t.preventDefault(), $(".settings-form-msg").html(""), confirm("Do You Want To Save Permissions Now?")) {
            var e = [],
                a = $("button[data-user-id]").length ? $(".access-level-submit-btn").data("user-id") : $('[name="access_user"]').length ? $('[name="access_user"]').val() : "",
                s = $("button[data-user-id]").length ? a : $('[name="access_level"]').val(),
                n = 0;
            $.each($('input[class~="user-access-levels"]'), function(t, a) {
                n = $(this).is(":checked") ? 1 : 0, e.push($(this).attr("data-name") + "," + n)
            }), $.ajax({
                url: baseUrl + "aj/userManagement/saveAccessLevelSettings",
                type: "POST",
                data: {
                    saveAccessLevelSettings: !0,
                    aclSettings: e,
                    acl: s,
                    accessUser: a
                },
                dataType: "json",
                cache: !1,
                beforeSend: function() {
                    $(".settings-form-msg").html('\n                        <div class="col-12">\n                            <div class="card">\n                                <div class="card-body">\n                                    <p class="text-center">\n                                        <span class="fa fa-spinner fa-spin"></span>\n                                    </p>\n                                </div>\n                            </div>\n                        </div>\n                    '), $("*", ".settings-form-a").prop("disabled", !0), $("*", ".permissions-row").prop("disabled", !0)
                },
                success: function(t) {
                    1 == t.status ? ($(".settings-form-msg").html(""), Toast.fire({
                        type: "success",
                        title: t.message
                    })) : ($(".settings-form-msg").html(""), Toast.fire({
                        type: "error",
                        title: t.message
                    }))
                },
                error: function() {
                    $(".settings-form-msg").html(""), $("*", ".settings-form-a").prop("disabled", !1), $("*", ".permissions-row").prop("disabled", !1), Toast.fire({
                        type: "error",
                        title: "Error Processing Request"
                    })
                },
                complete: function() {
                    $("*", ".settings-form-a").prop("disabled", !1), $("*", ".permissions-row").prop("disabled", !1), setTimeout(function() {
                        $(".settings-form-msg").empty()
                    }, 3e3)
                }
            })
        }
    })
};
$('button[class~="add-new-modal"], a[class~="add-new-modal"]').on("click", function(t) {
    $('[name="record_type"]').val("new-record"), $("div[id='newModalWindow'] form")[0].reset(), $('select[name="branchType"]').length ? ($("div[id='newModalWindow'] form select[name=\"branchType\"]").val("Store").change(), $("div[id='newModalWindow'] form select[name=\"status\"]").val("Active").change()) : $("div[id='newModalWindow'] form select").val("null").change()
});
var populateBranchesDetails = t => {
        $('[name="branchName"]').val(t.branch_name_text), $('[name="branchType"]').val(t.branch_type).change(), $('[name="phone"]').val(t.contact), $('[name="email"]').val(t.email), $('[name="branchId"]').val(t.branch_id), $('[name="location"]').val(t.location), $('[name="record_type"]').val("update-record"), $("#newModalWindow").modal("show"), hL(), $('div[class="form-content-loader"]').css("display", "none")
    },
    editBranchDetails = () => {
        $('div[class="main-content"]').on("click", 'button[class~="edit-branch"]', async function(t) {
            t.preventDefault(), $('div[class="form-content-loader"]').css("display", "flex");
            var e = $(this).data("branch-id");
            sL(), await dOC().then(t => {
                1 == t ? (noInternet = !1, $('div[class="connection"]').css("display", "none")) : (noInternet = !0, $('div[class="connection"]').css("display", "block"))
            }).catch(t => {
                noInternet = !0, $('div[class="connection"]').css("display", "block")
            }), noInternet && await gIDBR("branches", e).then(t => (populateBranchesDetails(t), hL(), !1)), "" != e && $.ajax({
                url: baseUrl + "aj/branchManagment/getBranchDetails",
                data: {
                    getBranchDetails: !0,
                    branchId: e
                },
                dataType: "json",
                type: "POST",
                cache: !1,
                beforeSend: function() {},
                success: function(t) {
                    populateBranchesDetails(t.message)
                },
                error: function(t) {
                    $('div[class="form-content-loader"]').css("display", "none")
                }
            })
        })
    },
    populateBranchesList = t => {
        $('table[class~="branchesLists"]').dataTable().fnDestroy(), $('table[class~="branchesLists"]').dataTable({
            aaData: t,
            iDisplayLength: 10,
            buttons: ["copy", "print", "csvHtml5"],
            lengthChange: !1,
            dom: "Bfrtip",
            columns: [{
                data: "row_id"
            }, {
                data: "branch_name"
            }, {
                data: "location"
            }, {
                data: "contact"
            }, {
                data: "email"
            }, {
                data: "status"
            }, {
                data: "action"
            }]
        }), $('div[class="form-content-loader"]').css("display", "none"), editBranchDetails(), hL(), delI()
    };
async function fetchBranchLists() {
    if ($('table[class~="branchesLists"]').length) {
        if (sL(), $('div[class="form-content-loader"]').css("display", "flex"), $('div[class~="delete-modal"]').modal("hide"), await dOC().then(t => {
                1 == t ? (noInternet = !1, $('div[class="connection"]').css("display", "none")) : (noInternet = !0, $('div[class="connection"]').css("display", "block"))
            }).catch(t => {
                noInternet = !0, $('div[class="connection"]').css("display", "block")
            }), noInternet) {
            await listIDB("branches").then(t => {
                var e = 0,
                    a = [];
                $.each(t, function(t, s) {
                    1 != s.deleted && (e++, s.row_id = e, a.push(s))
                }), populateBranchesList(a)
            });
            return hL(), !1
        }
        $.ajax({
            url: baseUrl + "aj/branchManagment/fetchBranchesLists",
            type: "POST",
            data: {
                request: "fetchBranchesLists"
            },
            dataType: "json",
            cache: !1,
            success: function(t) {
                populateBranchesList(t.message), upIDB("branches", t.message)
            },
            error: function(t) {
                $('div[class="form-content-loader"]').css("display", "none")
            },
            complete: function() {}
        })
    }
}

function cusPurHis() {
    let t = $('a[class="view-user-sales"]').attr("data-value");
    $('a[class="view-user-sales"]').attr("data-name");
    var e = $('a[class="view-user-sales"]').attr("data-record");
    $.ajax({
        type: "POST",
        url: `${baseUrl}aj/reportsAnalytics/generateReport`,
        data: {
            generateReport: !0,
            salesAttendantHistory: !0,
            queryMetric: "salesAttendantPerformance",
            userId: t,
            recordType: e
        },
        dataType: "JSON",
        beforeSend: function() {
            $('div[class~="attendantHistory"] div[class~="modal-body"]').html('<div align="center">Loading records <i class="fa fa-spin fa-spinner"></i></div>')
        },
        success: function(t) {
            var e = '<div class="table-responsive"><table width="100%" class="table  orderHistory">';
            e += "<thead>", e += '<tr class="text-uppercase">', e += "<td>#</td>", e += "<td>Order ID</td>", e += "<td>Order Amount</td>", e += "<td>Date</td>", e += "<td>Payment Mode</td>", e += "<td></td>", e += "</tr>", e += "</thead>";
            var a = "",
                s = 0;
            $.each(t.result, function(t, n) {
                s++, "cash" == n.payment_type ? a = '<span class="badge badge-success">Cash Sale</span>' : "momo" == n.payment_type ? a = '<span class="badge badge-primary">Mobile Money</span>' : "card" == n.payment_type ? a = '<span class="badge badge-secondary">Card Payment</span>' : "credit" == n.payment_type && (a = '<span class="badge badge-danger">Credit</span>'), e += "<tr>", e += `<td>${s}</td>`, e += `<td><a class="get-sales-details text-success" data-sales-id="${n.order_id}" href="javascript:void(0)" title="View Order Details">${n.order_id}</a></td>`, e += `<td>${companyVariables.cur} ${n.order_amount_paid}</td>`, e += `<td>${n.order_date}</td>`, e += `<td>${a}</td>`, e += `<td><a href="${baseUrl}invoice/${n.order_id}" title="View Purchase Details"><i class="fa fa-print"></i></a></td>`, e += "</tr>"
            }), e += "</table></div>", $('div[class~="attendantHistory"] div[class~="modal-body"]').html(e), $('table[class~="orderHistory"]').dataTable().fnDestroy(), $('table[class~="orderHistory"]').DataTable({
                buttons: ["copy", "print", "csvHtml5"],
                lengthChange: !1,
                dom: "Bfrtip"
            })
        },
        complete: function(t) {},
        error: function(t) {
            $('div[class~="attendantHistory"] div[class~="modal-body"]').html('\n                <p align="center">No records found.</p>\n            ')
        }
    })
}
if (fetchBranchLists(), $('form[id="updateProductForm"]').on("submit", function(t) {
        t.preventDefault(), $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: new FormData(this),
            dataType: "JSON",
            contentType: !1,
            cache: !1,
            processData: !1,
            beforeSend: function() {
                $('div[class="form-content-loader"]').css("display", "flex")
            },
            success: function(t) {
                Toast.fire({
                    type: t.status,
                    title: t.message.result
                }), "success" == t.status && setTimeout(function() {
                    window.location.href = `${baseUrl}products/${t.message.productId}`
                }, 1500), $('div[class="form-content-loader"]').css("display", "none")
            },
            error: function(t) {
                $('div[class="form-content-loader"]').css("display", "none")
            }
        })
    }), $('button[class~="resend-email-button"]').on("click", function(t) {
        let e = $(this),
            a = $('input[name="send_email"]'),
            s = $('input[name="fullname"]').val(),
            n = $('input[name="request_type"]').val();
        a.val().length > 5 ? (e.prop("disabled", !0).html('Sending <i class="fa fa-spinner fa-spin"></i>'), a.prop("disabled", !0), $.ajax({
            url: `${baseUrl}aj/pointOfSaleProcessor/sendMail`,
            type: "POST",
            data: {
                sendMail: !0,
                thisEmail: a.val(),
                fullname: s,
                thisRequest: n
            },
            dataType: "json",
            success: function(t) {
                Toast.fire({
                    type: t.status,
                    title: t.message
                }), "success" == t.status && $('div[class~="sendMailModal"]').modal("hide")
            },
            error: function(t) {
                Toast.fire({
                    type: "error",
                    title: "Error processing request!"
                }), a.prop("disabled", !1), e.prop("disabled", !1).html("Send")
            },
            complete: function(t) {
                a.prop("disabled", !1), e.prop("disabled", !1).html("Send")
            }
        })) : (Toast.fire({
            type: "error",
            title: "Please enter a valid email address!"
        }), a.prop("disabled", !1), e.prop("disabled", !1).html("Send"))
    }), $('table[class~="customersList"]').length) {
    $("#updateCustomerForm").on("submit", async function(t) {
        t.preventDefault();
        let e = $(this).serialize();
        $.post(baseUrl + "aj/customerManagement/updateCustomerDetails", e, t => {
            200 == t.status ? (Toast.fire({
                type: "success",
                title: t.message
            }), listCustomers(), $("#updateCustomerForm").parents(".modal").modal("hide"), $("#updateCustomerForm").trigger("reset")) : Toast.fire({
                type: "error",
                title: t.message
            }), $(".content-loader", $("#updateCustomerForm")).css({
                display: "none"
            })
        }).catch(t => {
            Toast.fire({
                type: "error",
                title: "Error Processing Request"
            }), $(".content-loader", $("#updateCustomerForm")).css({
                display: "none"
            })
        })
    }), $('div[class="main-content"]').on("click", 'a[class~="add-customer"]', function(t) {
        $('div[id="newCustomerModal"]').modal("show"), $('select[name="nc_title"]').val("null").change(), $('div[id="newCustomerModal"] input[name="request"]').val("add-record"), $('div[id="newCustomerModal"] h5[class="modal-title"]').html("Add Customer"), $('div[id="newCustomerModal"] form[id="updateCustomerForm"] input').val(""), $('input[name="customer_id"] form[id="updateCustomerForm"] input').val("")
    }), $('div[class="main-content"]').on("click", 'a[class~="edit-customer"]', function(t) {
        let e = $(this).data("value");
        userData = $(`a[data-id='${e}']`).data("info"), $('div[id="newCustomerModal"]').modal("show"), $('div[id="newCustomerModal"] h5[class="modal-title"]').html("Update Customer"), $('div[id="newCustomerModal"] select[name="nc_title"]').val(userData.title).change(), $('div[id="newCustomerModal"] input[name="nc_firstname"]').val(userData.firstname), $('div[id="newCustomerModal"] input[name="nc_lastname"]').val(userData.lastname), $('div[id="newCustomerModal"] input[name="nc_email"]').val(userData.email), $('div[id="newCustomerModal"] input[name="nc_contact"]').val(userData.phone_1), $('div[id="newCustomerModal"] input[name="residence"]').val(userData.residence), $('div[id="newCustomerModal"] input[name="customer_id"]').val(e), $('div[id="newCustomerModal"] input[name="request"]').val("update-record")
    });
    var populateCustomersList = t => {
        hL(), $('table[class~="customersList"]').dataTable().fnDestroy(), $('table[class~="customersList"]').dataTable({
            aaData: t,
            iDisplayLength: 10,
            buttons: ["copy", "print", "csvHtml5"],
            lengthChange: !1,
            dom: "Bfrtip",
            columns: [{
                data: "row_id"
            }, {
                data: "fullname"
            }, {
                data: "email"
            }, {
                data: "phone_1"
            }, {
                data: "date_log"
            }, {
                data: "action"
            }]
        }), delI()
    };

    function listCustomers() {
        $.ajax({
            method: "POST",
            url: `${baseUrl}aj/customerManagement/listCustomers`,
            data: {
                listCustomers: !0
            },
            dataType: "JSON",
            success: function(t) {
                populateCustomersList(t.result)
            },
            complete: function(t) {
                hL()
            },
            error: function(t) {
                hL()
            }
        })
    }
    listCustomers()
}
if ($("#newCustomer_form").on("submit", async function(t) {
        t.preventDefault();
        let e = $(this).serialize();
        if ($(".content-loader", $("#newCustomerModal")).css({
                display: "flex"
            }), await dOC().then(t => {
                1 == t ? (noInternet = !1, $('div[class="connection"]').css("display", "none")) : (noInternet = !0, $('div[class="connection"]').css("display", "block"))
            }).catch(t => {
                noInternet = !0, $('div[class="connection"]').css("display", "block")
            }), noInternet) {
            let t = randomInt(12);
            var a = [{
                customer_id: `EV${t}`,
                title: $('select[name="nc_title"]').val(),
                firstname: $('input[name="nc_firstname"]').val(),
                lastname: $('input[name="nc_lastname"]').val(),
                phone_1: $('input[name="nc_contact"]').val(),
                email: $('input[name="nc_email"]').val(),
                clientId: companyVariables.clientId,
                branchId: companyVariables.branchId,
                fullname: $('input[name="nc_firstname"]').val() + " " + $('input[name="nc_lastname"]').val()
            }];
            if ($('input[name="nc_firstname"]').val().length < 2) return Toast.fire({
                type: "error",
                title: "Please enter customer's firstname"
            }), $(".content-loader", $("#newCustomerModal")).css({
                display: "none"
            }), !1;
            if ($('input[name="nc_lastname"]').val().length < 2) return Toast.fire({
                type: "error",
                title: "Please enter customer's lastname"
            }), $(".content-loader", $("#newCustomerModal")).css({
                display: "none"
            }), !1;
            await aIDB("customers", a).then(e => {
                $("#newCustomer_form").parents(".modal").modal("hide"), $(".content-loader", $("#newCustomerModal")).css({
                    display: "none"
                }), $(".customer-select").children("option:first").after(`<option selected data-email='${$('input[name="nc_email"]').val()}' data-contact='${$('input[name="nc_contact"]').val()}' value=${t}>${$('input[name="nc_firstname"]').val()} ${$('input[name="nc_lastname"]').val()}</option>`), $('input[name="nc_email"]').length && $("#receipt-email").val($('input[name="nc_email"]').val()), $("#newCustomer_form").trigger("reset"), $(".customer-select").trigger("change")
            });
            return !1
        }
        $.post(baseUrl + "aj/pointOfSaleProcessor/quick-add-customer", e, t => {
            "success" == t.status ? ($(".customer-select").children("option:first").after(`<option selected data-email='${t.data[3]}' data-contact='${t.data[4]}' value=${t.data[0]}>${t.data[1]} ${t.data[2]}</option>`), t.data[3] && $("#receipt-email").val(t.data[3]), $(".customer-select").trigger("change"), $("#newCustomer_form").parents(".modal").modal("hide"), $("#newCustomer_form").trigger("reset")) : Toast.fire({
                type: "error",
                title: t.message
            }), $(".content-loader", $("#newCustomerModal")).css({
                display: "none"
            })
        }).catch(t => {
            Toast.fire({
                type: "error",
                title: "Error Processing Request"
            }), $(".content-loader", $("#newCustomerModal")).css({
                display: "none"
            })
        })
    }), $('a[class="select-branch"], a[class~="change-branch"]').on("click", function(t) {
        t.preventDefault();
        let e = $(this).data("href");
        $('div[class="redirection-href"]').attr("data-href", e), $('div[class~="importModal"]').modal("show")
    }), $('div[class~="complete-branch-selection"]').on("click", function() {
        let t = $(this).data("branch-id");
        $(this).children("div").css({
            border: `solid 1px ${companyVariables.tbr_col}`
        }), Toast.fire({
            type: "success",
            title: "Branch selection was successful."
        }), $('div[class="form-content-loader"]').css("display", "flex"), $.ajax({
            type: "POST",
            url: `${baseUrl}aj/importManager/setBranchId`,
            data: {
                setBranchId: !0,
                curBranchId: t
            },
            success: function(t) {
                window.location.href = $('div[class="redirection-href"]').attr("data-href")
            },
            complete: function(t) {
                $('div[class="form-content-loader"]').css("display", "none")
            }
        })
    }), $(".make-online-payment").length) {
    const t = 0,
        e = 1,
        a = 2,
        s = 3;
    var labels = ["Customer", "Products", "Payment", "Complete"];
    const n = "<i class='fa fa-arrow-circle-left font-12 mr-1'></i>",
        o = "<i class='fa fa-arrow-circle-right font-12 ml-1'></i>";

    function svReg() {
        let t = $("#pos-form-horizontal.register-form").serialize();
        return t += `&total_to_pay=${$("[data-order-total]").data("orderTotal")}&discountType=${$('input[name="discount_type"]:checked').val()}&discountAmount=${$('input[name="discount_amount"]').val()}`, $.post(baseUrl + "aj/pointOfSaleProcessor/saveRegister", t)
    }
    $('button[class~="discardSale_trigger"]').css("display", "none"), $("#pos-form-horizontal").steps({
        headerTag: "h3",
        bodyTag: "fieldset",
        transitionEffect: "slide",
        enablePagination: !1,
        onFinished(t) {
            rtRegForm(), $('span[class="sub_total"]').html(`${companyVariables.cur} 0.00`), $(".content-loader.register-form-loader").css({
                display: "none"
            })
        },
        onInit(e, a) {
            let r = this;
            $("[data-step-action='previous'").prop("disabled", a == t), $("[data-step-action='next'").toggle(a !== s), $("[data-step-action='finish'").toggle(a == s), $(".print-receipt").toggle(a == s), $("[data-step-action='previous'").html(n + labels[a]), $("[data-step-action='next'").html(labels[a + 1] + o), $(".custom-steps-actions").on("click", "button[data-step-action]", function(t) {
                $(r).steps($(this).data("stepAction"))
            }), $('select[class~="custom-select2"]').select2({
                width: "280px"
            })
        },
        onStepChanged(t, e, a) {
            $(".register-form ul[role='tablist'] li").addClass("disabled"), $(".register-form ul[role='tablist'] li.current").removeClass("disabled")
        },
        onStepChanging(r, l, c) {
            var i = $('select[class~="payment-type-select"]').val(),
                d = parseFloat($('input[name="amount_paying"]').val()),
                u = parseFloat($('input[name="amount_to_pay"]').attr("max")),
                p = $('select[class~="customer-select"]').val();
            if (isNaN(d) && (d = 0), l == t && "WalkIn" == p && ($('h6[class~="selected-customer-name"]').html("Walk In Customer"), $("[data-bind-html='customer']").html("Walk In Customer")), c == a) {
                let t = $('select[class~="customer-select"]').children("option:selected").data("prefered-payment");
                null != t && t.length > 0 && $('select[name="payment_type"]').val(t).change()
            }
            return l == t && "0" == p ? (Toast.fire({
                type: "error",
                title: "Please select a customer"
            }), !1) : l != e || $("input:checkbox.product-select:checked").length || 0 == c ? l == a && "0" == i && 1 != c ? (Toast.fire({
                type: "error",
                title: "Please select a payment type"
            }), !1) : "cash" == i && d < u && c == s ? (Toast.fire({
                type: "error",
                title: "Amount being paid is less than the total amount."
            }), !1) : ($("[data-step-action='previous']").html(n + (labels[c - 1] || labels[0])), $("[data-step-action='next']").html(labels[c + 1] + o), $("[data-step-action='previous']").prop("disabled", c == t), c == e && $("[data-step-action='next']").prop("disabled", !1), $(".newCustomer_trigger").toggle(c == t), c != t ? $('button[class~="discardSale_trigger"]').css("display", "block") : $('button[class~="discardSale_trigger"]').css("display", "none"), 3 == c && $('button[class~="discardSale_trigger"]').css("display", "none"), $("[data-step-action='next'], [data-step-action='previous']").toggle(c !== s), $("[data-step-action='finish']").toggle(c == s), $(".print-receipt").toggle(c == s), $("button.remove-row").prop("disabled", c == s).addClass("text-muted"), $("input.product-quantity").prop("readonly", c == s), $('div[class~="order_discounting"] input').prop("disabled", c == s), c == s && (dOC().then(t => {
                1 == t ? (noInternet = !1, $('div[class="connection"]').css("display", "none")) : (noInternet = !0, $('div[class="connection"]').css("display", "block"))
            }).catch(t => {
                noInternet = !0, $('div[class="connection"]').css("display", "block")
            }), noInternet ? sPIDB().then(t => {
                "error" == t.status ? Toast.fire({
                    type: "error",
                    title: t.result
                }) : ($("[data-bind-html='orderId']").html(t.orderId), $('span[class="generated_order"]').html(t.orderId), Toast.fire({
                    type: "success",
                    title: "Payment Successfully Recorded"
                }), $(".cash-process-loader").removeClass("d-flex"), "yes" == companyVariables.prt && $('button[class~="print-receipt"]').trigger("click"), fetchPOSProductsList(), fetchPOSCustomersList())
            }) : svReg().then(t => {
                $("[data-bind-html='orderId']").html(t.data._oid), $('span[class="generated_order"]').html(t.data._oid), Toast.fire({
                    type: "success",
                    title: "Payment Successfully Recorded"
                }), "yes" == companyVariables.prt && $('button[class~="print-receipt"]').trigger("click"), fetchPOSProductsList(), fetchPOSCustomersList(), $(".cash-process-loader").removeClass("d-flex")
            })), !0) : (Toast.fire({
                type: "error",
                title: "Please select product(s)"
            }), !1)
        }
    }), $('a[class~="discard-sale"]').on("click", function(t) {
        Toast.fire({
            type: "success",
            title: "Transaction was successfully discarded"
        }), setTimeout(function() {
            window.location.href = `${baseUrl}point-of-sale`
        }, 1500)
    });
    let r = [];
    $.expr[":"].Contains = function(t, e, a) {
        return $(t).text().toUpperCase().indexOf(a[3].toUpperCase()) >= 0
    }, $("#products-search-input").on("input", function(t) {
        let e = $(this).val(),
            a = $(".category-select").val();
        $(".temp-row").remove(), "all" == a || "" == a ? ($('table[id="products-table"] thead tr').show(), $("td.product-title-cell").parent().hide(), $(`td.product-title-cell:Contains(${e})`).parent().show(), ckEmpTb($("#products-table"))) : ($('table[id="products-table"] thead tr').show(), $("td.product-title-cell").parent().hide(), $(`td.product-title-cell:Contains(${e})`).parents(`tr[data-category='${a}']`).show(), ckEmpTb($("#products-table")))
    });
    var initialiteProductSelect = () => {
        $(".product-select").on("change", async function() {
            $(this).is(":checked") ? await adProR($(this).data()).then(t => {
                rcalTot(), amtPay();
                let e = $(".row-subtotal", $(`tr.products-row[data-row-id='${t.productId}']`)),
                    a = $(".receipt-row-subtotal", $(`tr.receipt-product-row[data-row-id='${t.productId}']`)),
                    s = $(".receipt-row-quantity", $(`tr.receipt-product-row[data-row-id='${t.productId}']`));
                $(`.product-quantity[data-row='${t.productId}']`).on("input", function() {
                    let n = $(this),
                        o = n.val().length ? parseInt(n.val()) : 0,
                        l = parseInt(n.attr("data-max")),
                        c = n.attr("data-name");
                    o < 1 && (o = 1, n.val(1));
                    let i = (r[t.productId] * o).toFixed(2);
                    e.text(i), s.text(o), a.text(formatCurrency(i)), rcalTot(), amtPay(), o > l && (n.val(l), Toast.fire({
                        type: "error",
                        title: `Sorry. Maximum number of available ${c} is ${l}`
                    }))
                }), $(`.remove-row[data-row='${t.productId}']`).on("click", function() {
                    rvPtRow(t.productId), $(`.product-select[data-product-id='${t.productId}']`).prop({
                        checked: !1
                    })
                }), $(".print-receipt").on("click", printReceipt)
            }) : rvPtRow($(this).data("productId"))
        })
    };

    function rtRegForm() {
        let t = $(".register-form"),
            e = $(".register-form ul[role='tablist'] li.first");
        t.trigger("reset"), e.removeClass("disabled"), $("a", e).trigger("click"), $(".receipt-table-body").html(""), $('input[name="discount_amount"]').val(""), $('span[class="sub_total"]').html(`${companyVariables.cur} 0.00`), $(".selected-customer-name").html("No Customer Selected"), $('button[class~="discardSale_trigger"]').css("display", "none"), $(".products-table-body tr:not(.empty-message-row)").remove(), $('input[name="amount_paying"]').attr({
            max: 0,
            min: 0
        }), $('input[name="amount_to_pay"]').attr({
            max: 0,
            value: ""
        }), $('span[class="total-to-pay-amount"]').attr("data-order-total", "0.00"), $('div[class~="order_discounting"] input').prop("disabled", !1), rcalRowNum(), $(".payment-type-select").trigger("change"), rcalTot()
    }

    function adProR(t) {
        return new Promise((e, a) => {
            let s = 1 * parseFloat(t.productPrice);
            r[t.productId] = parseFloat(t.productPrice), $(".empty-message-row").hide();
            let n = $(".products-table-body"),
                o = $("tr.products-row", n).length || 0;
            o++;
            let l = `<tr class='products-row' data-row-id='${t.productId}'>\n            \n            <td class='products-row-number'>${o}</td>\n            <td style="padding-top:20px">${t.productName}</td>\n            <td style="padding-top:20px">${t.productPrice}</td>\n            <td>\n            <input type='number' data-name="${t.productName}" form="pos-form-horizontal" name="products[${t.productId}][qty]" min="1" data-max='${t.product_max}' data-row='${t.productId}' class='form-control product-quantity' value="1">\n            <input type="hidden" data-name="${t.productName}" form="pos-form-horizontal" name="products[${t.productId}][price]" value="${t.productPrice}"></td>\n            <td style="padding-top:20px" class='row-subtotal'>${s}</td>\n            <td class='p-0'><button class='btn btn-sm mb-1 mt-4 btn-outline-danger remove-row' data-row='${t.productId}'><i class='fa fa-times'></i></button></td>\n            </tr>`,
                c = `<tr class='receipt-product-row' data-row-id='${t.productId}'>\n                <td>${t.productName}</td>\n                <td class='receipt-row-quantity'>1</td>\n                <td class="text-right receipt-row-subtotal">${formatCurrency(s)}</td>\n            </tr>`;
            n.append(l), $("[data-bind-html='productrow']").append(c), e(t)
        })
    }

    function rvPtRow(t) {
        let e = $(".products-table-body"),
            a = $(".receipt-table-body");
        $(`tr.receipt-product-row[data-row-id="${t}"]`, a).remove(), $(`tr.products-row[data-row-id="${t}"]`, e).remove(), rcalRowNum(), rcalTot()
    }
    $(".category-select").on("change", function() {
        let t = $(this).val(),
            e = $("#products-search-input").val();
        $(".temp-row").remove(), $('table[id="products-table"] thead tr').show(), "all" == t || "" == t ? e.length ? ($("td.product-title-cell").parent().hide(), $(`td.product-title-cell:Contains(${e})`).parent().show(), ckEmpTb($("#products-table"))) : ($("tr", $("#products-table")).show(), ckEmpTb($("#products-table"))) : e.length ? ($("td.product-title-cell").parents(`tr:not([data-category='${t}'])`).hide(), $(`td.product-title-cell:Contains(${e})`).parents(`tr[data-category='${t}']`).show(), ckEmpTb($("#products-table"))) : ($(`tr[data-category='${t}']`, $("#products-table")).show(), $(`tr:not([data-category='${t}'])`, $("#products-table")).hide(), ckEmpTb($("#products-table"))), $('table[id="products-table"] thead tr').show()
    }), $(".customer-select").on("change", function() {
        if ("0" == $(this).val()) $(".selected-customer-name").html("No Customer Selected");
        else {
            let t = $(this).children("option:selected"),
                e = $(this).children("option:selected").data("contact"),
                a = $(this).children("option:selected").data("prefered-payment");
            null != a && a.length > 0 && $('select[name="payment_type"]').val(a), $("[data-bind-html='customer']").html(`\n            ${t.text()}<br>\n                <span class="text-primary"><small>(${e})</small>\n        `), $(".selected-customer-name").html(`\n                <h3 class='text-success'>\n                    <span class="email-fullname">${t.text()}</span><br>\n                    <span class="text-primary"><small>(${e})</small></span>\n                </h3>`), $("input[id='receipt-email']").val(t.data("email"))
        }
    }), $(".payment-type-select").on("change", async function() {
        var t = $(this).val();
        if ($('input[name="amount_paying"]').prop("value", ""), $('input[name="amount_to_pay"]').attr({
                max: $(".total-to-pay-amount").attr("data-order-total"),
                value: formatCurrency($(".total-to-pay-amount").attr("data-order-total"))
            }), $('input[name="amount_balance"]').prop("value", "0.00"), $("[data-bind-html='payment']").html(formatCurrency($(".total-to-pay-amount").attr("data-order-total"))), $("[data-bind-html='balance']").html("credit" == t ? formatCurrency($(".total-to-pay-amount").attr("data-order-total")) : "0.00"), "0" == t ? $(".selected-payment-type").html("None Selected") : $(".selected-payment-type").html(`<h5 class='text-success'>${$(this).children("option:selected").text()}</h5>`), rcalTot(), ["MoMo", "card", "cash"].includes(t)) {
            $("[data-step-action='next']").prop("disabled", !0);
            var e = $(".total-to-pay-amount").attr("data-order-total");
            ["MoMo", "card"].includes(t) ? ($(".make-online-payment").attr("data-order-total", e), $('div[class~="cash-processing"]').slideUp("fast"), $(".make-online-payment").removeClass("d-none")) : ($(".make-online-payment").addClass("d-none"), $('div[class~="cash-processing"]').slideDown("fast"), $('input[name="amount_paying"]').focus())
        } else $(".total-to-pay-amount").attr("data-order-total", formatCurrency($(".total-to-pay-amount").attr("data-order-total"))), $('div[class~="cash-processing"]').slideUp("fast"), $(".make-online-payment").addClass("d-none"), $(".make-online-payment").removeAttr("data-order-total"), $("[data-step-action='next']").prop("disabled", !1)
    });
    var overallSubTotal = 0,
        totalDiscountDeducted = 0;

    function rcalTot() {
        let t = 0;
        if ($("tr.products-row .row-subtotal").length) {
            let e, a = $('input[name="discount_type"]:checked').val();
            e = $('input[name="discount_amount"]').val().length > 0 ? parseFloat($('input[name="discount_amount"]').val()) : 0, totalDiscountDeducted = 0, overallSubTotal = 0, $("tr.products-row .row-subtotal").each(function() {
                let e = parseFloat($(this).text());
                t += e, overallSubTotal += e
            }), "cash" == a ? (t -= e, totalDiscountDeducted = e) : (e = parseFloat(e / 100 * t).toFixed(2), t -= e, totalDiscountDeducted = e), $("th[data-bind-html='discount_amount']").html(`${formatCurrency(e)}`)
        }
        $(".payment-type-select").val();
        $('span[class="sub_total"]').html(`${companyVariables.cur} ${formatCurrency(overallSubTotal)}`), $("[data-bind-html='totaltopay']").html(formatCurrency(overallSubTotal)), $(".total-to-pay-amount").text(formatCurrency(t)), $(".total-to-pay-amount").attr("data-order-total", t), $('input[name="amount_paying"]').attr({
            max: t,
            min: 0
        }), $('input[name="amount_to_pay"]').attr({
            max: t,
            value: formatCurrency(t)
        })
    }
    var paymentCheck, paymentWindow, amtPay = () => {
        let t = parseFloat($('input[name="amount_paying"]').attr("max")),
            e = parseFloat($('input[name="amount_paying"]').val()),
            a = $(".payment-type-select").val(),
            s = e - t;
        $('input[name="amount_paying"]').val().length > 0 ? ($('input[name="amount_balance"]').val(formatCurrency(s)), $(".make-online-payment").addClass("d-none"), $(".make-online-payment").removeAttr("data-order-total"), $("[data-step-action='next']").prop("disabled", !1), $("[data-bind-html='amount_paid']").html(`${companyVariables.cur} ${formatCurrency(e)}`), $("[data-bind-html='payment']").html(`${companyVariables.cur} ${formatCurrency(overallSubTotal-totalDiscountDeducted)}`), $("[data-bind-html='balance']").html("credit" == a ? `${companyVariables.cur} ${formatCurrency(e)}` : `${companyVariables.cur} ${formatCurrency(s)}`)) : ($('input[name="amount_balance"]').val("0.00"), $(".make-online-payment").addClass("d-none"), $(".make-online-payment").attr("data-order-total", t), $("[data-bind-html='amount_paid']").html(`${companyVariables.cur} 0.00`), $("[data-bind-html='payment']").html("credit" == a ? `${companyVariables.cur} ${formatCurrency(t)}` : "${companyVariables.cur} 0.00"), $("[data-bind-html='balance']").html("credit" == a ? `${companyVariables.cur} ${formatCurrency(t)}` : "${companyVariables.cur} 0.00"))
    };

    function rcalRowNum() {
        $("tr.products-row").length || $(".empty-message-row").show(), $("tr.products-row").each(function(t, e) {
            let a = t + 1;
            $("td:first", $(this)).text(a)
        })
    }

    function ckEmpTb(t) {
        t.find("thead tr th").length;
        t.find("tbody tr:visible").length || t.find("tbody").append("<tr class='temp-row'><td colspan='4' class='text-center'>No Item Found</td></tr>")
    }

    function printReceipt(t) {
        t.preventDefault();
        let e = $('span[class="generated_order"]').html();
        window.open(`${baseUrl}receipt/${e}`, `Sales Invoice - Receipt #${e}`, "width=650,height=750,resizable,scrollbars=yes,status=1")
    }

    function ckPayState() {
        $.ajax({
            url: `${baseUrl}aj/pointOfSaleProcessor/checkPaymentStatus`,
            type: "POST",
            data: {
                checkPaymentStatus: !0
            },
            dataType: "json",
            cache: !1,
            success: function(t) {
                if (0 != t.status) {
                    clearInterval(paymentCheck);
                    let e = "error",
                        a = "Payment Cancelled";
                    if (1 == t.status) {
                        $(".payment-processing-span").html('\n                            <p class="text-center">\n                            <span class="fa fa-check text-success"></span>\n                            </p>\n                        '), a = "Payment Successfully Made.", e = "success";
                        let t = $(".register-form ul[role='tablist'] li.last");
                        t.removeClass("disabled"), $("a", t).trigger("click"), t.addClass("disabled"), $("[data-step-action='next']").prop("disabled", !1), $(".payment-type-select").prop("disabled", !1), $('span[class="payment-processing-span"]').html("")
                    } else $(".payment-type-select, [data-step-action='previous']").prop("disabled", !1), $(".make-online-payment").removeClass("d-none"), $(".payment-processing-span").empty();
                    Toast.fire({
                        type: e,
                        title: a
                    }), $(".cancel-online-payment").addClass("d-none")
                }
            }
        })
    }
    $('input[name="amount_paying"]').on("keyup", function() {
        amtPay()
    }), $('input[name="discount_amount"]').on("keyup", function() {
        rcalTot(), amtPay()
    }), $('input[name="discount_type"]').on("change", function() {
        $('input[name="discount_amount"]').trigger("focus"), rcalTot(), amtPay()
    }), $('button[class~="send-email"]').on("click", function(t) {
        let e = $(this),
            a = $('input[id="receipt-email"]'),
            s = $('h6[class~="selected-customer-name"] span[class="email-fullname"]').html();
        a.val().length > 5 ? (e.prop("disabled", !0).html('Sending <i class="fa fa-spinner fa-spin"></i>'), a.prop("disabled", !0), $.ajax({
            url: `${baseUrl}aj/pointOfSaleProcessor/sendMail`,
            type: "POST",
            data: {
                sendMail: !0,
                thisEmail: a.val(),
                fullname: s
            },
            dataType: "json",
            success: function(t) {
                Toast.fire({
                    type: t.status,
                    title: t.message
                })
            },
            error: function(t) {
                Toast.fire({
                    type: "error",
                    title: "Error processing request!"
                }), a.prop("disabled", !1), e.prop("disabled", !1).html("Send")
            },
            complete: function(t) {
                a.prop("disabled", !1), e.prop("disabled", !1).html("Send")
            }
        })) : (Toast.fire({
            type: "error",
            title: "Please enter a valid email address!"
        }), a.prop("disabled", !1), e.prop("disabled", !1).html("Send"))
    }), $(".make-online-payment").on("click", async function(t) {
        t.preventDefault(), await svReg().then(function(t) {
            if ("success" == t.status) {
                $('span[class="generated_order"]').html(t.data._oid);
                var e = $("input[id='receipt-email']").val();
                $.ajax({
                    url: baseUrl + "aj/pointOfSaleProcessor/processMyPayment",
                    data: {
                        processMyPayment: !0,
                        orderId: t.data.orderId,
                        orderTotal: t.data.orderTotal,
                        userEmail: e
                    },
                    dataType: "json",
                    type: "POST",
                    cache: !1,
                    beforeSend: function() {
                        $(".payment-type-select, [data-step-action='previous']").prop("disabled", !0), $(".make-online-payment").addClass("d-none"), $(".cancel-online-payment").removeClass("d-none"), $(".payment-processing-span").html('\n                        <span class="fa fa-spinner fa-spin mr-3"></span>\n                    ')
                    },
                    success: function(e) {
                        1 == e.status ? 1 == e.message.action ? ($("[data-bind-html='amount_paid']").html(`${companyVariables.cur} ${formatCurrency(t.data.orderTotal)}`), paymentWindow = window.open(e.message.msg, "_blank"), paymentCheck = setInterval(function() {
                            ckPayState()
                        }, 3e3)) : $(".payment-processing-span").html(e.message.msg) : (Toast.fire({
                            type: "error",
                            title: "Payment Failed! Please try again."
                        }), $(".payment-processing-span").html(""), $(".payment-type-select, [data-step-action='previous']").prop("disabled", !1), $(".make-online-payment").removeClass("d-none"), $(".cancel-online-payment").addClass("d-none"))
                    },
                    error: function() {
                        Toast.fire({
                            type: "error",
                            title: "Error Processing Request! Please try again"
                        }), $(".payment-processing-span").html(""), $(".payment-type-select, [data-step-action='previous']").prop("disabled", !1), $(".make-online-payment").removeClass("d-none"), $(".cancel-online-payment").addClass("d-none")
                    }
                })
            } else $(".payment-processing-span").html('\n                    <p class="text-center text-danger">\n                        Payment Failed To Process Request\n                    </p>\n                '), $(".payment-type-select, [data-step-action='previous']").prop("disabled", !1)
        })
    }), $(".cancel-online-payment").on("click", function() {
        $.post(`${baseUrl}aj/pointOfSaleProcessor/cancelPayment`, {
            cancelPayment: !0
        }, function(t) {
            let e = "error",
                a = "Failed To Cancel";
            200 == (t = $.parseJSON(t)).status && (clearInterval(paymentCheck), $(".payment-type-select, [data-step-action='previous']").prop("disabled", !1), $(".make-online-payment").removeClass("d-none"), $(".cancel-online-payment").addClass("d-none"), $(".payment-processing-span").empty(), paymentWindow && paymentWindow.close(), e = "success", a = "Payment Cancelled"), Toast.fire({
                type: e,
                title: a
            })
        })
    })
}
var summaryItems = {
    "total-sales": "totalSales"
};
async function getSalesDetails(t) {
    if ($(".show-modal-title").html("Sale Details"), $('div[class="form-content-loader"]').css("display", "flex"), $(".launchModal").modal("show"), await dOC().then(t => {
            1 == t ? (offline = !1, $('div[class="connection"]').css("display", "none")) : (offline = !0, $('div[class="connection"]').css("display", "block"))
        }).catch(t => {
            offline = !0, $('div[class="connection"]').css("display", "block")
        }), offline) return listIDB("sales_details").then(async e => {
        var a = '\n                <div class="row table-responsive">';
        await gIDBR("sales", t).then(t => {
            a += `<table class="table table-bordered">\n                        <tr>\n                            <td><strong>Customer Name</strong>: ${t.customer_fullname}</td>\n                            <td align='left'><strong>Transaction ID:</strong>: ${t.order_id}</td>\n                        </tr>\n                        <tr>\n                            <td><strong>Contact</strong>: ${t.customer_contact}</td>\n                            <td align='left'><strong>Transaction Date</strong>: ${t.order_date}</td>\n                        </tr>\n                    </table>`
        });
        a += '<table class="table table-bordered">\n                    <thead>\n                        <tr>\n                            <td class="text-left">Product</td>\n                            <td class="text-left">Quantity</td>\n                            <td class="text-right">Unit Price</td>\n                            <td class="text-right">Total</td>\n                        </tr>\n                    </thead>\n                    <tbody>';
        var s = 0;
        $.each(e, function(e, n) {
            n.order_id == t && (a += `\n                        <tr>\n                            <td>${n.product_title}</td>\n                            <td>${n.product_quantity}</td>\n                            <td class="text-right">${companyVariables.cur} ${n.product_unit_price}</td>\n                            <td class="text-right">${companyVariables.cur} ${n.product_total}</td>\n                        </tr>`, s += parseFloat(n.product_total))
        });
        var n = s - 0;
        a += `<tr>\n                    <td style="font-weight:bolder;text-transform:uppercase" colspan="3" class="text-right">Subtotal</td>\n                    <td style="font-weight:bolder;text-transform:uppercase" class="text-right">\n                        ${companyVariables.cur} ${formatCurrency(s)}\n                    </td>\n                </tr>\n                <tr>\n                    <td style="font-weight:;text-transform:uppercase" colspan="3" class="text-right">Discount</td>\n                    <td style="font-weight:;text-transform:uppercase" class="text-right">${companyVariables.cur} 0</td>\n                </tr>\n                <tr>\n                    <td style="font-weight:bolder;text-transform:uppercase" colspan="3" class="text-right">Overall Total</td>\n                    <td style="font-weight:bolder;text-transform:uppercase" class="text-right">${companyVariables.cur} ${formatCurrency(n)}</td>\n                </tr>\n\n                </tbody>\n                </table>\n            </div>\n            <div class="card">\n                <div class="row">\n                    <div class="offline-placeholder main-body-loader" style="display: flex">\n                        <div class="offline-content text-center">\n                            <p>You are offline</p>\n                            <button type="button" class="btn cursor btn-warning">Reconnect</button>\n                        </div>\n                    </div>\n                </div>\n            </div>`, $(".show-modal-body").html(a), $('div[class="form-content-loader"]').css("display", "none"), reConnect()
    }), !1;
    $.ajax({
        url: baseUrl + "aj/dashboardAnalytics/getSalesDetails",
        type: "POST",
        dataType: "json",
        data: {
            getSalesDetails: !0,
            salesID: t
        },
        beforeSend: function() {
            $(".show-modal-title").html("Sale Details")
        },
        success: function(t) {
            1 == t.status ? $(".show-modal-body").html(t.message) : $(".show-modal-body").html('\n                    <p class="alert alert-danger text-white text-center">No sales records found</p>\n                ')
        },
        complete: function() {
            $('div[class="form-content-loader"]').css("display", "none")
        },
        error: function(t) {
            $('div[class="form-content-loader"]').css("display", "none")
        }
    })
}
if ($(function() {
        var t = t => {
                $('table[class~="branch-overview"]').dataTable().fnDestroy(), $('table[class~="branch-overview"]').dataTable({
                    aaData: t,
                    iDisplayLength: 5,
                    buttons: ["copy", "print", "csvHtml5"],
                    lengthChange: !1,
                    dom: "Bfrtip",
                    columns: [{
                        data: "branch_name"
                    }, {
                        data: "total_sales"
                    }, {
                        data: "highest_sales"
                    }, {
                        data: "lowest_sales"
                    }, {
                        data: "average_sales"
                    }, {
                        data: "orders_count"
                    }, {
                        data: "square_feet_sales"
                    }]
                })
            },
            e = (t, e, a) => {
                $('div[class="attendant-chart"]').html(""), $('div[class="attendant-chart"]').html('<div id="attendant-performance" class="apex-charts"></div>'), $('table[class~="attendant-performance"]').dataTable().fnDestroy(), $('table[class~="attendant-performance"]').dataTable({
                    iDisplayLength: 5,
                    aaData: t,
                    buttons: ["copy", "print", "csvHtml5"],
                    lengthChange: !1,
                    dom: "Bfrtip",
                    columns: [{
                        data: "fullname"
                    }, {
                        data: "sales.amount"
                    }, {
                        data: "sales.orders"
                    }, {
                        data: "sales.average_sale"
                    }, {
                        data: "targets.target_amount"
                    }, {
                        data: "targets.target_percent"
                    }, {
                        data: "items.total_items_sold"
                    }, {
                        data: "items.average_items_sold"
                    }]
                });
                var s = {
                    chart: {
                        height: 400,
                        type: "bar",
                        toolbar: {
                            show: !1
                        }
                    },
                    plotOptions: {
                        bar: {
                            horizontal: !0
                        }
                    },
                    dataLabels: {
                        enabled: !1
                    },
                    series: [{
                        name: "Sales Recorded",
                        data: a
                    }],
                    colors: ["#17a2b8"],
                    yaxis: {
                        axisBorder: {
                            show: !0,
                            color: "#bec7e0"
                        },
                        axisTicks: {
                            show: !0,
                            color: "#bec7e0"
                        }
                    },
                    xaxis: {
                        categories: e
                    },
                    states: {
                        hover: {
                            filter: "none"
                        }
                    },
                    grid: {
                        borderColor: "#f1f3fa"
                    },
                    tooltip: {
                        shared: !0,
                        intersect: !1,
                        y: {
                            formatter: function(t) {
                                return void 0 !== t ? companyVariables.cur + formatCurrency(t) : t
                            }
                        }
                    }
                };
                new ApexCharts(document.querySelector("#attendant-performance"), s).render()
            },
            a = t => {
                $('table[class~="products-performance"]').dataTable().fnDestroy(), $('table[class~="products-performance"]').dataTable({
                    iDisplayLength: 7,
                    aaData: t,
                    buttons: ["copy", "print", "csvHtml5"],
                    lengthChange: !1,
                    dom: "Bfrtip",
                    columns: [{
                        data: "row_id"
                    }, {
                        data: "product_title"
                    }, {
                        data: "orders_count"
                    }, {
                        data: "quantity_sold"
                    }, {
                        data: "total_selling_cost"
                    }, {
                        data: "total_selling_revenue"
                    }, {
                        data: "product_profit"
                    }]
                })
            },
            s = (e = "today") => {
                $('table[class~="branch-overview"]').length && $.ajax({
                    type: "POST",
                    url: `${baseUrl}aj/reportsAnalytics/generateReport`,
                    data: {
                        generateReport: !0,
                        queryMetric: "branchPerformance",
                        salesPeriod: e
                    },
                    dataType: "JSON",
                    beforeSend: function() {},
                    success: function(e) {
                        t(e.result.summary)
                    },
                    complete: function(t) {
                        hL()
                    }
                })
            },
            n = (t = "today") => {
                $.ajax({
                    type: "POST",
                    url: `${baseUrl}aj/reportsAnalytics/generateReport`,
                    data: {
                        generateReport: !0,
                        queryMetric: "summaryItems",
                        salesPeriod: t
                    },
                    dataType: "JSON",
                    beforeSend: function() {
                        sL(), $('div[data-report] p[class~="text-truncate"]').html('\n                    Loading <i class="fa fa-spin fa-spinner"></i>\n                ')
                    },
                    success: function(t) {
                        $.each(t.result, function(t, e) {
                            $(`div[data-report="${e.column}"] h3[class="my-3"]`).html(e.total), $(`div[data-report="${e.column}"] p[class~="text-truncate"]`).html(e.trend)
                        })
                    },
                    error: function(t) {
                        console.log(t)
                    }
                })
            },
            o = (t = "today") => {
                $.ajax({
                    type: "POST",
                    url: `${baseUrl}aj/reportsAnalytics/generateReport`,
                    data: {
                        generateReport: !0,
                        queryMetric: "salesOverview",
                        salesPeriod: t
                    },
                    dataType: "JSON",
                    success: function(e) {
                        $('div[class="chart-sales"]').html(""), $('div[class="chart-sales"]').html('<div id="sales-overview-chart" class="apex-charts"></div>'), $('p[data-model="highest-sale"] span').html(e.result.sales.highest), $('p[data-model="lowest-sale"] span').html(e.result.sales.lowest), $('p[data-model="total-sales"] span').html(e.result.sales.comparison.total_sales), $('p[data-model="total-actual-sales"] span').html(e.result.sales.comparison.total_actual_sales), $('p[data-model="total-credit-sales"] span').html(e.result.sales.comparison.total_credit_sales), $('p[data-model="sales-with-discount"] span').html(e.result.sales.discount_effect.total_sale), $('p[data-model="sales-without-discount"] span').html(e.result.sales.discount_effect.discounted_sale), a(e.result.sales.products_performance);
                        var s = {
                            chart: {
                                height: 374,
                                type: "line",
                                shadow: {
                                    enabled: !1,
                                    color: "#bbb",
                                    top: 3,
                                    left: 2,
                                    blur: 3,
                                    opacity: 1
                                },
                                zoom: !1
                            },
                            plotOptions: {
                                bar: {
                                    columnWidth: "30%"
                                }
                            },
                            stroke: {
                                width: [4, 0],
                                curve: "smooth"
                            },
                            series: [{
                                type: "line",
                                name: "Total Sales With Discount",
                                data: e.result.sales.discount_effect.with_discount
                            }, {
                                type: "area",
                                name: "Total Sales Without Discount",
                                data: e.result.sales.discount_effect.without_discount
                            }],
                            xaxis: {
                                type: "datetime",
                                categories: e.result.labeling,
                                axisBorder: {
                                    show: !0,
                                    color: "#bec7e0"
                                },
                                axisTicks: {
                                    show: !0,
                                    color: "#f1646c"
                                }
                            },
                            colors: ["#1ecab8", "#f7cda0"],
                            markers: {
                                size: 4,
                                opacity: .9,
                                colors: ["#ffbc00"],
                                strokeColor: "#fff",
                                strokeWidth: 2,
                                style: "hollow",
                                hover: {
                                    size: 7
                                }
                            },
                            yaxis: {
                                title: {
                                    text: "Sales Values"
                                }
                            },
                            fill: {
                                type: "gradient",
                                gradient: {
                                    gradientToColors: ["#f1646c"],
                                    shadeIntensity: .1,
                                    type: "horizontal",
                                    opacityFrom: .7,
                                    opacityTo: 1,
                                    stops: [0, 100, 100, 100]
                                }
                            },
                            tooltip: {
                                shared: !0,
                                intersect: !1,
                                y: {
                                    formatter: function(t) {
                                        return void 0 !== t ? companyVariables.cur + formatCurrency(t) : t
                                    }
                                }
                            },
                            grid: {
                                row: {
                                    colors: ["transparent", "transparent"],
                                    opacity: .2
                                },
                                borderColor: "#185a9d"
                            }
                        };
                        if ("today" == t && delete s.xaxis.type, new ApexCharts(document.querySelector("#sales-overview-chart"), s).render(), $('div[class="chart-comparison"]').length) {
                            $('div[class="chart-comparison"]').html(""), $('div[class="chart-comparison"]').html('<div id="sales-comparison" class="apex-charts"></div>');
                            var n = {
                                chart: {
                                    height: 420,
                                    type: "line",
                                    stacked: !1,
                                    toolbar: {
                                        show: !0
                                    },
                                    zoom: !1,
                                    shadow: {
                                        enabled: !1,
                                        color: "#bbb",
                                        top: 3,
                                        left: 2,
                                        blur: 3,
                                        opacity: 1
                                    }
                                },
                                stroke: {
                                    width: [0, 2, 4],
                                    curve: "smooth"
                                },
                                plotOptions: {
                                    bar: {
                                        columnWidth: "40%"
                                    }
                                },
                                colors: ["#1ecab8", "#fbb624", "#f93b7a"],
                                series: [{
                                    name: "Total Sales",
                                    type: "column",
                                    data: e.result.data
                                }, {
                                    name: "Paid Sales",
                                    type: "area",
                                    data: e.result.sales.actuals
                                }, {
                                    name: "Credit Sales",
                                    type: "line",
                                    data: e.result.sales.credit
                                }],
                                fill: {
                                    opacity: [.85, .25, 1],
                                    gradient: {
                                        inverseColors: !1,
                                        shade: "light",
                                        type: "vertical",
                                        opacityFrom: .85,
                                        opacityTo: .55,
                                        stops: [0, 100, 100, 100]
                                    }
                                },
                                labels: e.result.labeling,
                                markers: {
                                    size: 2,
                                    opacity: .9,
                                    colors: ["#ffbc00"],
                                    strokeColor: "#fff",
                                    strokeWidth: 2,
                                    style: "hollow",
                                    hover: {
                                        size: 7
                                    }
                                },
                                xaxis: {
                                    type: "datetime",
                                    axisBorder: {
                                        show: !0,
                                        color: "#bec7e0"
                                    },
                                    axisTicks: {
                                        show: !0,
                                        color: "#bec7e0"
                                    }
                                },
                                yaxis: {
                                    title: {
                                        text: "Saes Values"
                                    }
                                },
                                tooltip: {
                                    shared: !0,
                                    intersect: !1,
                                    y: {
                                        formatter: function(t) {
                                            return void 0 !== t ? companyVariables.cur + formatCurrency(t) : t
                                        }
                                    }
                                },
                                grid: {
                                    borderColor: "#f1f3fa"
                                }
                            };
                            "today" == t && delete n.xaxis.type, new ApexCharts(document.querySelector("#sales-comparison"), n).render()
                        }
                        if ($('div[class="payment-chart"]').length) {
                            $('div[class="payment-chart"]').html(""), $('div[class="payment-chart"]').html('<div id="payment-options" class="apex-charts"></div>');
                            var o = {
                                chart: {
                                    height: 380,
                                    type: "donut"
                                },
                                series: e.result.sales.payment_options.payment_values,
                                legend: {
                                    show: !0,
                                    position: "bottom",
                                    horizontalAlign: "center",
                                    verticalAlign: "middle",
                                    floating: !1,
                                    fontSize: "14px",
                                    offsetX: 0,
                                    offsetY: -10
                                },
                                tooltip: {
                                    shared: !0,
                                    intersect: !1,
                                    y: {
                                        formatter: function(t) {
                                            return void 0 !== t ? companyVariables.cur + formatCurrency(t) : t
                                        }
                                    }
                                },
                                labels: e.result.sales.payment_options.payment_option,
                                colors: ["#08aeb0", "#232f5b", "#f06a6c", "#f1e299", "#08aeb0"],
                                responsive: [{
                                    breakpoint: 600,
                                    options: {
                                        chart: {
                                            height: 270
                                        },
                                        legend: {
                                            show: !0
                                        }
                                    }
                                }],
                                fill: {
                                    type: "gradient"
                                }
                            };
                            new ApexCharts(document.querySelector("#payment-options"), o).render()
                        }
                        if ($('div[class="category-chart"]').length) {
                            $('div[class="category-chart"]').html(""), $('div[class="category-chart"]').html('<div id="category-options" class="apex-charts"></div>');
                            var r = {
                                chart: {
                                    height: 450,
                                    type: "donut"
                                },
                                series: e.result.sales.category_sales.data,
                                legend: {
                                    show: !0,
                                    position: "bottom",
                                    horizontalAlign: "center",
                                    verticalAlign: "middle",
                                    floating: !1,
                                    fontSize: "14px",
                                    offsetX: 0,
                                    offsetY: -10
                                },
                                tooltip: {
                                    shared: !0,
                                    intersect: !1,
                                    y: {
                                        formatter: function(t) {
                                            return void 0 !== t ? companyVariables.cur + formatCurrency(t) : t
                                        }
                                    }
                                },
                                labels: e.result.sales.category_sales.labels,
                                colors: ["#08aeb0", "#232f5b", "#f06a6c", "#f1e299", "#08aeb0"],
                                responsive: [{
                                    breakpoint: 600,
                                    options: {
                                        chart: {
                                            height: 270
                                        },
                                        legend: {
                                            show: !0
                                        }
                                    }
                                }],
                                fill: {
                                    type: "gradient"
                                }
                            };
                            new ApexCharts(document.querySelector("#category-options"), r).render()
                        }
                        $('div[class="revenue-chart"]').html(""), $('div[class="revenue-chart"]').html('<div id="revenue-trend" class="apex-charts"></div>');
                        if($("#revenue-trend").length) {
                            var l = {
                                chart: {
                                    height: 450,
                                    type: "line",
                                    stacked: !1,
                                    zoom: !1,
                                    toolbar: {
                                        show: !1
                                    }
                                },
                                dataLabels: {
                                    enabled: !1
                                },
                                stroke: {
                                    width: [0, 0, 2]
                                },
                                plotOptions: {
                                    bar: {
                                        columnWidth: "40%"
                                    }
                                },
                                series: [{
                                    name: "Products Cost Price",
                                    type: "column",
                                    data: e.result.sales.revenue.cost
                                }, {
                                    name: "Products Selling Price",
                                    type: "column",
                                    data: e.result.sales.revenue.selling
                                }, {
                                    name: "Profit Generated",
                                    type: "line",
                                    data: e.result.sales.revenue.profit
                                }],
                                colors: ["#fa5c7c", "#20016c", "#77d0ba"],
                                xaxis: {
                                    type: "datetime",
                                    categories: e.result.labeling,
                                    axisBorder: {
                                        show: !0,
                                        color: "#bec7e0"
                                    },
                                    axisTicks: {
                                        show: !0,
                                        color: "#bec7e0"
                                    }
                                },
                                yaxis: [{
                                    opposite: !0,
                                    axisTicks: {
                                        show: !0
                                    },
                                    axisBorder: {
                                        show: !0,
                                        color: "#77d0ba"
                                    },
                                    labels: {
                                        style: {
                                            color: "#77d0ba"
                                        }
                                    },
                                    title: {
                                        text: "Products Cost, Selling & Revenue Generated"
                                    }
                                }],
                                tooltip: {
                                    followCursor: !0,
                                    y: {
                                        formatter: function(t) {
                                            return void 0 !== t ? companyVariables.cur + formatCurrency(t) : t
                                        }
                                    }
                                },
                                grid: {
                                    borderColor: "#f1f3fa"
                                },
                                legend: {
                                    offsetY: -10
                                },
                                responsive: [{
                                    breakpoint: 600,
                                    options: {
                                        yaxis: {
                                            show: !1
                                        },
                                        legend: {
                                            show: !1
                                        }
                                    }
                                }]
                            };
                            "today" == t && delete l.xaxis.type, new ApexCharts(document.querySelector("#revenue-trend"), l).render(), 
                            $('div[class~="apexcharts-legend"]').addClass("hidden")
                        }
                    },
                    error: function(t) {
                        console.log(t), hL()
                    },
                    complete: function(t) {
                        setTimeout(function() {
                            hL(), $('div[class~="apexcharts-legend"]').removeClass("center hidden")
                        }, 1e3)
                    }
                })
            },
            r = () => {
                $('div[class="main-content"]').on("click", 'a[class~="view-user-sales"]', function() {
                    var t = $(this).attr("data-value"),
                        e = $(this).attr("data-name"),
                        a = $(this).attr("data-record");
                    "attendant" == a ? $('div[class~="attendantHistory"] h5').html(`${e}'s Sales History`) : $('div[class~="attendantHistory"] h5').html(`${e}'s Purchases History`), $('div[class~="attendantHistory"]').modal("show"), $.ajax({
                        type: "POST",
                        url: `${baseUrl}aj/reportsAnalytics/generateReport`,
                        data: {
                            generateReport: !0,
                            salesAttendantHistory: !0,
                            queryMetric: "salesAttendantPerformance",
                            userId: t,
                            recordType: a
                        },
                        dataType: "JSON",
                        beforeSend: function() {
                            $('div[class~="attendantHistory"] div[class~="modal-body"]').html('<div align="center">Loading records <i class="fa fa-spin fa-spinner"></i></div>')
                        },
                        success: function(t) {
                            var e = '<table width="100%" class="table table-bordered orderHistory">';
                            e += "<thead>", e += '<tr class="text-uppercase">', e += "<td>Order ID</td>", e += "<td>Customer Name</td>", e += "<td>Order Amount</td>", e += "<td>Date</td>", e += "<td></td>", e += "</tr>", e += "</thead>";
                            var a = "";
                            $.each(t.result, function(t, s) {
                                "cash" == s.payment_type ? a = '<span class="text-gray">Cash Sale</span>' : "momo" == s.payment_type ? a = '<span class="text-gray">Mobile Money</span>' : "card" == s.payment_type ? a = '<span class="text-gray">Card Payment</span>' : "credit" == s.payment_type && (a = '<span class="text-gray">Credit</span>'), e += "<tr>", e += `<td><a onclick="getSalesDetails('${s.order_id}');" class="get-sales-details" data-sales-id="${s.order_id}" href="javascript:void(0)" title="View Order Details">${s.order_id}</a><br>${a}</td>`, e += `<td><a onclick="getSalesDetails('${s.order_id}');" data-name="${s.fullname}" href="javascript:void(0);" title="Click to list customer orders history" data-value="${s.customer_id}" class="customer-orders">${s.fullname}</a></td>`, e += `<td>${companyVariables.cur}${s.order_amount_paid}</td>`, e += `<td>${s.order_date}</td>`, e += `<td><a onclick="getSalesDetails('${s.order_id}');" class="get-sales-details" data-sales-id="${s.order_id}" href="${baseUrl}invoices/${s.order_id}" title="View Purchase Details"><i class="fa fa-print"></i></a></td>`, e += "</tr>"
                            }), e += "</table>", $('div[class~="attendantHistory"] div[class~="modal-body"]').html(e), $('table[class~="orderHistory"]').DataTable()
                        },
                        complete: function(t) {},
                        error: function(t) {
                            $('div[class~="attendantHistory"] div[class~="modal-body"]').html('\n                        <p align="center">No records found.</p>\n                    ')
                        }
                    })
                })
            },
            l = (t = "today") => {
                $('div[id="attendant-performance"]').length && $.ajax({
                    type: "POST",
                    url: `${baseUrl}aj/reportsAnalytics/generateReport`,
                    data: {
                        generateReport: !0,
                        queryMetric: "salesAttendantPerformance",
                        salesPeriod: t
                    },
                    dataType: "JSON",
                    beforeSend: function() {},
                    success: function(t) {
                        e(t.result.list, t.result.names, t.result.sales)
                    },
                    complete: function(t) {
                        r(), $('div[class~="apexcharts-legend"]').removeClass("center")
                    },
                    error: function(t) {
                        console.log(t)
                    }
                })
            },
            c = (t = "today") => {
                $.ajax({
                    type: "POST",
                    url: `${baseUrl}aj/reportsAnalytics/generateReport`,
                    data: {
                        generateReport: !0,
                        queryMetric: "ordersCount",
                        salesPeriod: t
                    },
                    dataType: "JSON",
                    beforeSend: function() {
                        $('div[class~="orders-loader"]').html('\n                    Loading <i class="fa fa-spin fa-spinner"></i>\n                ')
                    },
                    success: function(e) {
                        $('div[class~="orders-loader"]').html(""), $('div[class="apexchart-wrapper"]').html(""), $('div[class="apexchart-wrapper"]').html('<div id="dash_spark_1" class="chart-gutters"></div>'), $('div[data-report="orders-trend"] h3[class="mn-3"]').html(`${e.result.count} <small>total orders</small>`);
                        var a = {
                            chart: {
                                type: "line",
                                height: 385,
                                sparkline: {
                                    enabled: !1
                                },
                                toolbar: {
                                    show: !1
                                },
                                zoom: !1
                            },
                            stroke: {
                                curve: "smooth",
                                width: 2
                            },
                            fill: {
                                opacity: [.45, .25, 1]
                            },
                            series: [{
                                name: "All Orders",
                                type: "line",
                                data: e.result.data
                            }, {
                                name: "New Customers",
                                type: "line",
                                data: e.result.unique_customers
                            }, {
                                name: "Returning Customers",
                                type: "line",
                                data: e.result.returning_customers
                            }],
                            yaxis: {
                                min: 0
                            },
                            xaxis: {
                                type: "datetime",
                                categories: e.result.labeling,
                                axisBorder: {
                                    show: !0,
                                    color: "#bec7e0"
                                },
                                axisTicks: {
                                    show: !0,
                                    color: "#bec7e0"
                                }
                            },
                            colors: ["#e6c255", "#1ecab8", "#ffc107"],
                            tooltip: {
                                shared: !0,
                                intersect: !1
                            },
                            grid: {
                                borderColor: "#f1f3fa"
                            }
                        };
                        "today" == t && delete a.xaxis.type, new ApexCharts(document.querySelector("#dash_spark_1"), a).render()
                    },
                    error: function(t) {
                        $('div[class~="orders-loader"]').html("")
                    },
                    complete: function(t) {
                        $('div[class~="apexcharts-legend"]').removeClass("center")
                    }
                })
            },
            i = (t = "today") => {
                $('table[class~="custPerformance"]').length && $.ajax({
                    type: "POST",
                    url: `${baseUrl}aj/reportsAnalytics/generateReport`,
                    data: {
                        generateReport: !0,
                        queryMetric: "topContactsPerformance",
                        salesPeriod: t
                    },
                    dataType: "JSON",
                    beforeSend: function() {},
                    success: function(t) {
                        $('table[class~="custPerformance"]').dataTable().fnDestroy(), $('table[class~="custPerformance"]').dataTable({
                            aaData: t.result,
                            iDisplayLength: 10,
                            buttons: ["copy", "print", "csvHtml5"],
                            lengthChange: !1,
                            dom: "Bfrtip",
                            columns: [{
                                data: "row_id"
                            }, {
                                data: "fullname"
                            }, {
                                data: "orders_count"
                            }, {
                                data: "total_amount"
                            }, {
                                data: "total_balance"
                            }, {
                                data: "action"
                            }]
                        })
                    },
                    error: function(t) {},
                    complete: function(t) {
                        r()
                    }
                })
            },
            d = () => {
                var t = $('select[name="periodSelected"]').val();
                $.ajax({
                    url: `${baseUrl}aj/dashboardAnalytics/getSales`,
                    type: "POST",
                    dataType: "json",
                    data: {
                        getSales: !0,
                        salesPeriod: t
                    },
                    beforeSend: function() {
                        $(".total-sales-trend, .total-served-trend, .total-products-worth, .total-credit-sales-trend").html('\n                    <span class="fa fa-spin fa-spinner"></span>\n                ')
                    },
                    success: function(t) {
                        $('table[class~="salesLists"]').dataTable().fnDestroy(), 1 == t.status ? ($('table[class~="salesLists"]').dataTable({
                            aaData: t.message.table,
                            iDisplayLength: 10,
                            buttons: ["copy", "print", "csvHtml5"],
                            lengthChange: !1,
                            dom: "Bfrtip",
                            columns: [{
                                data: "row"
                            }, {
                                data: "order_id"
                            }, {
                                data: "fullname"
                            }, {
                                data: "phone"
                            }, {
                                data: "date"
                            }, {
                                data: "amount"
                            }, {
                                data: "action"
                            }]
                        }), $(".total-sales").html(t.message.totalSales.total), $(".total-sales-trend").html(t.message.totalSales.trend), $(".total-served").html(t.message.totalServed.total), $(".total-served-trend").html(t.message.totalServed.trend), $(".average-sales").html(t.message.averageSales.total), $(".average-sales-trend").html(t.message.averageSales.trend), $(".total-discounts").html(t.message.totalDiscount.total), $(".total-discounts-trend").html(t.message.totalDiscount.trend), $(".total-credit-sales").html(t.message.totalCredit.total), $(".total-credit-sales-trend").html(t.message.totalCredit.trend), $(".total-profit").html(t.message.salesComparison.profit), $(".total-profit-trend").html(t.message.salesComparison.profit_trend), $(".total-selling").html(t.message.salesComparison.selling), $(".total-selling-trend").html(t.message.salesComparison.selling_trend), $(".total-cost").html(t.message.salesComparison.cost), $(".total-cost-trend").html(t.message.salesComparison.cost_trend)) : $('table[class~="salesLists"]').dataTable()
                    },
                    complete: function(t) {
                        $('div[class="main-content"]').on("click", 'a[class~="print-receipt"]', function(t) {
                            let e = $(this).data("sales-id");
                            window.open(`${baseUrl}receipt/${e}`, `Sales Invoice - Receipt #${e}`, "width=650,height=750,resizable,scrollbars=yes,status=1")
                        }), hL()
                    },
                    error: function(t) {}
                })
            },
            u = () => {
                if ($('table[class~="inventoryLists"]').length) {
                    $.ajax({
                        url: `${baseUrl}aj/dashboardAnalytics/fetchInventoryRecords`,
                        type: "POST",
                        dataType: "json",
                        data: {
                            fetchInventoryRecords: !0,
                            request: "fetchInventoryRecords"
                        },
                        success: function(t) {
                            1 == t.status && ($('table[class~="inventoryLists"]').dataTable().fnDestroy(), $('table[class~="inventoryLists"]').dataTable({
                                aaData: t.message,
                                iDisplayLength: 10,
                                columns: [{
                                    data: "row"
                                }, {
                                    data: "product"
                                }, {
                                    data: "quantity"
                                }, {
                                    data: "price"
                                }, {
                                    data: "recordedBy"
                                }, {
                                    data: "orderDate"
                                }]
                            }))
                        },
                        complete: function() {}
                    })
                }
            },
            p = () => {
                if ($('table[class~="thresholdLists"]').length) {
                    $.ajax({
                        url: baseUrl + "aj/dashboardAnalytics",
                        type: "POST",
                        dataType: "json",
                        data: {
                            request: "getProductThresholds"
                        },
                        success: function(t) {
                            1 == t.status && ($('table[class~="thresholdLists"]').dataTable().fnDestroy(), $('table[class~="thresholdLists"]').dataTable({
                                aaData: t.message,
                                iDisplayLength: 10,
                                columns: [{
                                    data: "row"
                                }, {
                                    data: "product"
                                }, {
                                    data: "quantity"
                                }]
                            }))
                        },
                        complete: function() {}
                    })
                }
            };
        if ($('span[class~="switch-button"]').on("click", async function(t) {
                let e = $(this).attr("data-show-content"),
                    a = $(this).attr("data-hide-content");
                $(`div[class~="${e}"]`).removeClass("hidden").fadeIn("slow"), $(`div[class~="${a}"]`).addClass("hidden").fadeOut("slow"), await $.ajax({
                    url: `${baseUrl}doprocess_branches/saveReportsRecord`,
                    data: {
                        saveReportsRecord: !0,
                        attendantPerformance: e
                    },
                    type: "POST",
                    dataType: "JSON",
                    success: function(t) {}
                })
            }), $('div[class~="dashboard-reports"], div[class~="overallSalesHistory"], div[class~="pos-reporting"]').length) {
            var m = !0;
            !async function() {
                if (await dOC().then(t => {
                        1 == t ? (m = !1, $('div[class="connection"]').css("display", "none")) : (m = !0, $('div[class="connection"]').css("display", "block"))
                    }).catch(t => {
                        m = !0, $('div[class="connection"]').css("display", "block")
                    }), m) return $('select[name="periodSelected"], select[name="periodSelect"]').prop("disabled", !0), $('div[class~="offline-placeholder"]').css({
                    display: "flex"
                }), $('div[class~="offline-placeholder"] button[type="button"]').html("Reconnect").css({
                    display: "inline-flex"
                }), async function() {
                    var t = await async function() {
                        return new Promise((t, e) => {
                            t(listIDB("sales"))
                        })
                    }();
                    Array.prototype.unique = function() {
                        return this.filter(function(t, e, a) {
                            return a.indexOf(t) === e
                        })
                    };
                    var e = 0,
                        a = 0,
                        s = 0,
                        n = 0,
                        o = 0,
                        r = new Array,
                        l = new Array,
                        c = new Array,
                        i = new Array,
                        d = new Array,
                        u = "",
                        p = (new Array, new Array);
                    $.each(t, function(t, m) {
                        1 != companyVariables._hi ? m.branchId == companyVariables._clb && m.recorded_by == companyVariables._ud && (s += 1, r.push(m.customer_id), e += parseFloat(m.order_amount_paid), o += parseFloat(m.total_cost_price), n += parseFloat(m.total_expected_selling_price), c.push(parseFloat(m.order_amount_paid)), p.push(parseFloat(m.hour_of_day)), 1 == m.credit_sales ? i.push(parseFloat(m.order_amount_paid)) : 0 == m.credit_sales && d.push(parseFloat(m.order_amount_paid))) : (s += 1, 1 == m.credit_sales ? i.push(parseFloat(m.order_amount_paid)) : 0 == m.credit_sales && d.push(parseFloat(m.order_amount_paid)), o += parseFloat(m.total_cost_price), r.push(m.customer_id), e += parseFloat(m.order_amount_paid), c.push(parseFloat(m.order_amount_paid)), n += parseFloat(m.total_expected_selling_price), p.push(parseFloat(m.hour_of_day))), 1 == m.credit_sales && (a += parseFloat(m.order_amount_paid)), "cash" == m.payment_type ? u = '<span class="text-gray">Cash Sale</span>' : "momo" == m.payment_type ? u = '<span class="text-gray">Mobile Money</span>' : "card" == m.payment_type ? u = '<span class="text-gray">Card Payment</span>' : "credit" == m.payment_type && (u = '<span class="text-gray">Credit</span>'), 1 != companyVariables._hi ? m.recorded_by == companyVariables._ud && l.push({
                            row: s,
                            order_id: `${m.order_id} <br> ${u}`,
                            fullname: `<a href="javascript:void(0)" type="button" class="get-sales-details text-success" data-sales-id="${m.order_id}" onclick="return getSalesDetails('${m.order_id}')">${m.customer_fullname}</a>`,
                            phone: m.customer_contact,
                            date: m.order_date,
                            amount: m.order_amount_paid,
                            action: `<a href="javascript:void(0)" type="button" class="get-sales-details text-success" data-sales-id="${m.order_id}" onclick="return getSalesDetails('${m.order_id}')">\n                            <i class="fa fa-eye"></i>\n                        </a>`
                        }) : l.push({
                            row: s,
                            order_id: `${m.order_id} <br> ${u}`,
                            fullname: `<a href="javascript:void(0)" type="button" class="get-sales-details text-success" data-sales-id="${m.order_id}" onclick="return getSalesDetails('${m.order_id}')">${m.customer_fullname}</a>`,
                            phone: m.customer_contact,
                            date: m.order_date,
                            amount: m.order_amount_paid,
                            action: `<a href="javascript:void(0)" type="button" class="get-sales-details text-success" data-sales-id="${m.order_id}" onclick="return getSalesDetails('${m.order_id}')">\n                        <i class="fa fa-eye"></i>\n                    </a>`
                        })
                    });
                    for (var m = `${companyVariables.cur} ${formatCurrency(Math.min(...c))}`, h = `${companyVariables.cur} ${formatCurrency(Math.max(...c))}`, f = (companyVariables.cur, formatCurrency(n - e), `${companyVariables.cur} ${formatCurrency(a)}`), y = `${companyVariables.cur} ${formatCurrency(e)}`, v = `${companyVariables.cur} ${formatCurrency(o)}`, b = `${companyVariables.cur} ${formatCurrency(e-o)}`, g = `<span class='text-danger'>${companyVariables.cur} ${parseFloat(a/e*100).toFixed(2)}% of Total Sales</span>`, w = `${companyVariables.cur} ${formatCurrency(e/s)}`, _ = new Array, x = 0; x < p.length; x++) void 0 !== _[p[x]] ? _[p[x]] += parseFloat(c[x]) : void 0 !== typeof p[x] && (_[p[x]] = parseFloat(c[x]));
                    var T = {
                            0: "12AM",
                            1: "1AM",
                            2: "2AM",
                            3: "3AM",
                            4: "4AM",
                            5: "5AM",
                            6: "6AM",
                            7: "7AM",
                            8: "8AM",
                            9: "9AM",
                            10: "10AM",
                            11: "11AM",
                            12: "12PM",
                            13: "1PM",
                            14: "2PM",
                            15: "3PM",
                            16: "4PM",
                            17: "5PM",
                            18: "6PM",
                            19: "7PM",
                            20: "8PM",
                            21: "9PM",
                            22: "10PM",
                            23: "11PM"
                        },
                        C = new Array,
                        k = new Array;
                    return $.each(_, function(t, e) {
                        null != e && (k.push(e), C.push(T[t]))
                    }), {
                        total: y,
                        credit: f,
                        orders: s,
                        customers: r.unique(),
                        creditPercent: g,
                        salesHistory: l,
                        averageSale: w,
                        profit: b,
                        selling: y,
                        cost: v,
                        highest: h,
                        lowest: m,
                        analitics: {
                            hourValues: k,
                            goodHour: C
                        }
                    }
                }().then(async s => {
                    if ($('table[class~="salesLists"]').length && ($('table[class~="salesLists"]').dataTable().fnDestroy(), $('table[class~="salesLists"]').dataTable({
                            aaData: s.salesHistory,
                            iDisplayLength: 10,
                            columns: [{
                                data: "row"
                            }, {
                                data: "order_id"
                            }, {
                                data: "fullname"
                            }, {
                                data: "phone"
                            }, {
                                data: "date"
                            }, {
                                data: "amount"
                            }, {
                                data: "action"
                            }]
                        })), $('div[class~="dashboard-reports"]').length && ($(".total-sales").html(s.total), $(".total-sales-trend").html('<span class="text-success"><i class="mdi mdi-trending-up"></i> Total Sales Today</span>'), $(".total-served").html(s.orders), $(".total-served-trend").html('<span class="text-success"><i class="mdi mdi-trending-up"></i> Customers Served</span>'), $(".total-products").html(s.averageSale), $(".total-products-worth").html('<span class="text-success"><i class="mdi mdi-trending-up"></i> Sold today</span>'), $(".total-credit-sales").html(s.credit), $(".total-credit-sales-trend").html(s.creditPercent), $(".total-profit").html(s.profit), $(".total-profit-trend").html('<span class="text-success"><i class="mdi mdi-trending-up"></i> Profits made from sale</span>'), $(".total-selling").html(s.selling), $(".total-selling-trend").html('<span class="text-success"><i class="mdi mdi-trending-up"></i> Revenue less Discount</span>'), $(".total-cost").html(s.cost), $(".total-cost-trend").html('<span class="text-success"><i class="mdi mdi-trending-up"></i> Costs of Items sold</span>')), $('div[class~="pos-reporting"]').length) {
                        await gIDBR("reports", "branch_performance").then(e => {
                            delete e.reports_id, new Array, t(Object.values(e))
                        }).then(t => {
                            gIDBR("reports", "sales_attendant_performance").then(t => {
                                e(Object.values(t.list), Object.values(t.names), Object.values(t.sales))
                            })
                        }).then(t => {
                            gIDBR("reports", "products_performance").then(t => {
                                delete t.reports_id, a(Object.values(t))
                            })
                        }), $('p[data-model="highest-sale"] span').html(s.highest), $('p[data-model="lowest-sale"] span').html(s.lowest), $('div[data-report="total-sales"] h3[class="my-3"]').html(s.total), $('div[data-report="total-sales"] p[class~="text-truncate"]').html('<span class="text-success"><i class="mdi mdi-trending-up"></i> Total Sales Today</span>'), $('div[data-report="average-sales"] h3[class="my-3"]').html(s.averageSale), $('div[data-report="average-sales"] p[class~="text-truncate"]').html('<span class="text-success"><i class="mdi mdi-trending-up"></i> Average Sales Today</span>'), $('div[data-report="highest-sales"] h3[class="my-3"]').html(s.highest), $('div[data-report="highest-sales"] p[class~="text-truncate"]').html('<span class="text-success"><i class="mdi mdi-trending-up"></i> highest Sales Today</span>'), $('div[data-report="total-orders"] h3[class="my-3"]').html(s.orders), $('div[data-report="total-orders"] p[class~="text-truncate"]').html('<span class="text-success"><i class="mdi mdi-trending-up"></i> Total Sales Today</span>');
                        var n = {
                            chart: {
                                height: 374,
                                type: "line",
                                shadow: {
                                    enabled: !1,
                                    color: "#bbb",
                                    top: 3,
                                    left: 2,
                                    blur: 3,
                                    opacity: 1
                                }
                            },
                            stroke: {
                                width: 5,
                                curve: "smooth"
                            },
                            series: [{
                                name: "Total Sales",
                                data: s.analitics.hourValues
                            }],
                            xaxis: {
                                type: "datetime",
                                categories: s.analitics.goodHour,
                                axisBorder: {
                                    show: !0,
                                    color: "#bec7e0"
                                },
                                axisTicks: {
                                    show: !0,
                                    color: "#bec7e0"
                                }
                            },
                            fill: {
                                type: "gradient",
                                gradient: {
                                    shade: "dark",
                                    gradientToColors: ["#43cea2"],
                                    shadeIntensity: 1,
                                    type: "horizontal",
                                    opacityFrom: 1,
                                    opacityTo: 1,
                                    stops: [0, 100, 100, 100]
                                }
                            },
                            markers: {
                                size: 4,
                                opacity: .9,
                                colors: ["#ffbc00"],
                                strokeColor: "#fff",
                                strokeWidth: 2,
                                style: "hollow",
                                hover: {
                                    size: 7
                                }
                            },
                            yaxis: {
                                title: {
                                    text: "Sales Values"
                                }
                            },
                            tooltip: {
                                shared: !0,
                                intersect: !1,
                                y: {
                                    formatter: function(t) {
                                        return void 0 !== t ? companyVariables.cur + formatCurrency(t) : t
                                    }
                                }
                            },
                            grid: {
                                row: {
                                    colors: ["transparent", "transparent"],
                                    opacity: .2
                                },
                                borderColor: "#185a9d"
                            },
                            responsive: [{
                                breakpoint: 600,
                                options: {
                                    chart: {
                                        toolbar: {
                                            show: !1
                                        }
                                    },
                                    legend: {
                                        show: !1
                                    }
                                }
                            }]
                        };
                        delete n.xaxis.type, new ApexCharts(document.querySelector("#sales-overview-chart"), n).render()
                    }
                }), hL(), !1;
                if ($('div[class~="offline-placeholder"]').css({
                        display: "none"
                    }), $('div[class~="offline-placeholder"] button[type="button"]').prop("disabled", !1), $('div[class~="dashboard-reports"], div[class~="overallSalesHistory"]').length) u(), d(), p(), $('div[class~="sales-overview-data"]').length && o("this-week");
                else if ($('div[class~="pos-reporting"]').length) {
                    var r = $('select[name="periodSelect"]').val();
                    $('div[class~="reports-summary"]').length && (n(r), o(r), l(r), $('div[id="dash_spark_1"]').length && c(r), i(r), s(r)), $('select[name="periodSelect"]').on("change", function() {
                        sL();
                        var t = $(this).val();
                        n(t), o(t), $('div[id="dash_spark_1"]').length && c(t), l(t), i(t), s(t)
                    })
                }
                $('select[name="periodSelected"]').on("change", function() {
                    d()
                })
            }()
        }
    }), $('div[class~="request-form"]').length) {
    let t = [];
    overallSubTotal = 0, totalDiscountDeducted = 0;

    function recalculateTotalToPay() {
        let t = 0;
        if ($("tr.products-row .row-subtotal").length) {
            let e, a = $('input[name="discount_type"]:checked').val();
            e = $('input[name="discount_amount"]').val().length > 0 ? parseFloat($('input[name="discount_amount"]').val()) : 0, totalDiscountDeducted = 0, overallSubTotal = 0, $("tr.products-row .row-subtotal div").each(function() {
                let e = parseFloat($(this).text());
                t += e, overallSubTotal += e
            }), "cash" == a ? (t -= e, totalDiscountDeducted = e) : (e = parseFloat(e / 100 * t).toFixed(2), t -= e, totalDiscountDeducted = e), $("th[data-bind-html='discount_amount']").html(`${formatCurrency(e)}`)
        }
        $(".payment-type-select").val();
        $('span[class="sub_total"]').html(`${companyVariables.cur} ${formatCurrency(overallSubTotal)}`), $("[data-bind-html='totaltopay']").html(formatCurrency(overallSubTotal)), $(".total-to-pay-amount").text(formatCurrency(t)), $(".total-to-pay-amount").attr("data-order-total", t), $('input[name="amount_paying"]').attr({
            max: t,
            min: 0
        }), $('input[name="amount_to_pay"]').attr({
            max: t,
            value: formatCurrency(t)
        })
    }

    function checkForEmptyTable(t) {
        t.find("thead tr th").length;
        t.find("tbody tr:visible").length || t.find("tbody").append("<tr class='temp-row'><td colspan='4' class='text-center'>No Item Found</td></tr>")
    }

    function recalculateRowNumber() {
        $("tr.products-row").length || ($('div[class~="save-div"]').addClass("hidden"), $(".empty-message-row").show()), $("tr.products-row").each(function(t, e) {
            let a = t + 1;
            $("td:first", $(this)).text(a)
        })
    }

    function removeProductRow(t) {
        let e = $(".products-table-body"),
            a = $(".receipt-table-body");
        $(`tr.receipt-product-row[data-row-id="${t}"]`, a).remove(), $(`tr.products-row[data-row-id="${t}"]`, e).remove(), recalculateRowNumber(), recalculateTotalToPay()
    }

    function addProductRow(e) {
        return new Promise((a, s) => {
            let n = 1 * parseFloat(e.productPrice);
            t[e.productId] = parseFloat(e.productPrice), $(".empty-message-row").hide();
            let o = $(".products-table-body"),
                r = $("tr.products-row", o).length || 0;
            r++;
            let l = `<tr class='products-row' data-row-id='${e.productId}'>\n            \n            <td class='products-row-number'>${r}</td>\n            <td>${e.productName}</td>\n            <td><input type="number" min="1" onkeypress="return isNumber(event)" data-name="${e.productName}" form="pos-form-horizontal" name="products[${e.productId}][price]" class="form-control product-price" style="width:110px" value="${e.productPrice}"></td>\n            <td>\n            <input type='number' onkeypress="return isNumber(event)" data-name="${e.productName}" form="pos-form-horizontal" name="products[${e.productId}][qty]" min="1" data-max='${e.product_max}' data-row='${e.productId}' class='form-control product-quantity' value="1">\n            </td>\n            <td class='row-subtotal'><div class="mt-2">${n}</div></td>\n            <td class='p-0'><button class='btn mt-4 btn-sm btn-outline-danger mb-1 remove-row' data-row='${e.productId}'><i class='fa fa-times'></i></button></td>\n            </tr>`,
                c = `<tr class='receipt-product-row' data-row-id='${e.productId}'>\n                <td>${e.productName}</td>\n                <td class='receipt-row-quantity'>1</td>\n                <td class="text-right receipt-row-subtotal">${n}</td>\n            </tr>`;
            o.append(l), $("[data-bind-html='productrow']").append(c), a(e)
        })
    }
    $('input[name="amount_paying"]').on("keyup", function() {}), $('input[name="discount_amount"]').on("keyup", function() {
        recalculateTotalToPay()
    }), $('input[name="discount_type"]').on("change", function() {
        $('input[name="discount_amount"]').trigger("focus"), recalculateTotalToPay()
    }), $.expr[":"].Contains = function(t, e, a) {
        return $(t).text().toUpperCase().indexOf(a[3].toUpperCase()) >= 0
    }, $("#products-search-input").on("input", function(t) {
        let e = $(this).val(),
            a = $(".category-select").val();
        $(".temp-row").remove(), "all" == a || "" == a ? ($('table[id="products-table"] thead tr').show(), $("td.product-title-cell").parent().hide(), $(`td.product-title-cell:Contains(${e})`).parent().show(), checkForEmptyTable($("#products-table"))) : ($('table[id="products-table"] thead tr').show(), $("td.product-title-cell").parent().hide(), $(`td.product-title-cell:Contains(${e})`).parents(`tr[data-category='${a}']`).show(), checkForEmptyTable($("#products-table")))
    }), $(".category-select").on("change", function() {
        let t = $(this).val(),
            e = $("#products-search-input").val();
        $(".temp-row").remove(), $('table[id="products-table"] thead tr').show(), "all" == t || "" == t ? e.length ? ($("td.product-title-cell").parent().hide(), $(`td.product-title-cell:Contains(${e})`).parent().show(), checkForEmptyTable($("#products-table"))) : ($("tr", $("#products-table")).show(), checkForEmptyTable($("#products-table"))) : e.length ? ($("td.product-title-cell").parents(`tr:not([data-category='${t}'])`).hide(), $(`td.product-title-cell:Contains(${e})`).parents(`tr[data-category='${t}']`).show(), checkForEmptyTable($("#products-table"))) : ($(`tr[data-category='${t}']`, $("#products-table")).show(), $(`tr:not([data-category='${t}'])`, $("#products-table")).hide(), checkForEmptyTable($("#products-table"))), $('table[id="products-table"] thead tr').show()
    });
    initialiteProductSelect = (() => {
        $(".product-select").on("change", async function() {
            $(this).is(":checked") ? await addProductRow($(this).data()).then(e => {
                recalculateTotalToPay(), $('div[class~="save-div"]').removeClass("hidden");
                let a = $(".row-subtotal", $(`tr.products-row[data-row-id='${e.productId}']`)),
                    s = $(".receipt-row-subtotal", $(`tr.receipt-product-row[data-row-id='${e.productId}']`)),
                    n = $(".receipt-row-quantity", $(`tr.receipt-product-row[data-row-id='${e.productId}']`));
                $(`.product-quantity[data-row='${e.productId}'], input[name="products[${e.productId}][price]"]`).on("input", function() {
                    let o, r = $(this),
                        l = $(`.product-quantity[data-row='${e.productId}']`),
                        c = l.val().length ? parseInt(l.val()) : 0,
                        i = r.attr("data-name");
                    if (c < 1 && (c = 1, l.val(1)), r.hasClass("product-quantity")) o = (t[e.productId] * c).toFixed(2);
                    else {
                        let t;
                        o = ((t = isNaN(parseFloat(r.val())) ? 0 : parseFloat(r.val())) * c).toFixed(2)
                    }
                    if (a.text(o), n.text(c), s.text(formatCurrency(o)), recalculateTotalToPay(), "OrdersList" == sessionName && r.hasClass("product-quantity")) {
                        let t = parseInt(l.attr("data-max"));
                        c > t && (l.val(t), Toast.fire({
                            type: "error",
                            title: `Sorry. Maximum number of available ${i} is ${t}`
                        }))
                    }
                }), $(`.remove-row[data-row='${e.productId}']`).on("click", function() {
                    removeProductRow(e.productId), $(`.product-select[data-product-id='${e.productId}']`).prop({
                        checked: !1
                    })
                })
            }) : removeProductRow($(this).data("productId"))
        })
    });
    $('div[class~="request-form"] button[class~="save-request"]').on("click", function() {
        $(this);
        var t = $(this).attr("data-request");
        randomInt(12);
        customerId = $('select[name="customer"]').val(), discountType = $('input[name="discount_type"]:checked').val(), request = $('span[class="hide-walk-in-customer"]').data("request"), discountAmt = $('input[name="discount_amount"]').val(), selectedProducts = new Array, thisProductTotal = 0, productSubTotal = 0, $('div[class="form-content-loader"]').css("display", "flex"), $.each($('tbody[class="products-table-body"] tr[class="products-row"]'), function(t, e) {
            let a = $(this).data("row-id");
            productQuantity = parseFloat($(`input[name="products[${a}][qty]"]`).val()), productPrice = parseFloat($(`input[name="products[${a}][price]"]`).val()), thisProductTotal = productQuantity * productPrice, productSubTotal += thisProductTotal, selectedProducts.push({
                productId: a,
                productQuantity: productQuantity,
                productPrice: productPrice,
                thisProductTotal: thisProductTotal
            })
        });
        let e = 0;
        discountAmt.length > 0 && ("cash" == discountType ? (discountAmt > productSubTotal && (discountAmt = productSubTotal, $('input[name="discount_amount"]').val(productSubTotal)), e = parseFloat(discountAmt)) : "percentage" == discountType && (discountAmt > 100 && (discountAmt = 100, $('input[name="discount_amount"]').val(100)), e = parseFloat(discountAmt) / 100 * productSubTotal));
        parseFloat(productSubTotal - e).toFixed();
        return "null" == customerId ? (Toast({
            type: "error",
            title: "Please select customer to continue!"
        }), $('div[class="form-content-loader"]').css("display", "none"), !1) : selectedProducts.length < 1 ? (Toast({
            type: "error",
            title: "Please select at least one product!"
        }), $('div[class="form-content-loader"]').css("display", "none"), !1) : void(confirm("Are you sure you want to complete this transaction?") && $.post(`${baseUrl}aj/pushRequest`, {
            selectedProducts: selectedProducts,
            customerId: customerId,
            request: request,
            discountAmt: discountAmt,
            discountType: discountType
        }, function(e) {
            200 != e.status ? (Toast({
                type: "error",
                title: e.result
            }), $('div[class="form-content-loader"]').css("display", "none")) : ($('div[class="form-content-loader"]').css("display", "none"), Toast({
                type: "success",
                title: e.result.message
            }), "save-invoice" == t ? setTimeout(function() {
                window.location.href = `${baseUrl}invoice/${e.result.invoiceNumber}`
            }, 500) : setTimeout(function() {
                window.location.href = `${baseUrl}requests/${e.result.requestType}`
            }, 1e3))
        }, "json").catch(t => {
            $('div[class="form-content-loader"]').css("display", "none"), Toast({
                type: "error",
                title: "Sorry! Error processing request."
            })
        }))
    })
}
$(() => {
    $('a[class~="read-instructions"]').on("click", function() {
        $('div[class~="instructionsModal"]').modal("show")
    });
    var t = new Array,
        e = new Array;
    $('div[class~="upload-buttons"] button[type="cancel"]').on("click", function(t) {
        confirm("Are you sure you want to cancel?") && (Toast.fire({
            type: "success",
            title: "Data upload was successfully cancelled"
        }), setTimeout(() => {
            window.location.href = `${baseUrl}import`
        }, 1e3))
    }), $('div[class~="upload-buttons"] button[type="submit"]').on("click", function(t) {
        var a = $(this);
        a.prop({
            disabled: !0,
            title: "Processing content"
        }).html('<i class="fa fa-spin fa-spinner"></i> Processing Content'), $('div[class="form-content-loader"]').css("display", "flex"), $.each($('div[class~="csv-rows-content"] select'), function(t, a) {
            var s = $(this).data("id"),
                n = $(this).attr("data-name");
            e[n] = new Array, $.each($(`div[class~="csv-row-data-${s}"] p`), function(t, a) {
                var s = $(this).text();
                e[n].push(s)
            })
        }), confirm("Do you want to continue data upload?") && ($(".main-content-loader.main-body-loader").css({
            display: "flex"
        }), $.ajax({
            type: "POST",
            url: `${baseUrl}aj/importManager/uploadCSVData/${currentData}`,
            data: {
                csvKey: Object.keys(e),
                csvValues: Object.values(e),
                uploadCSVData: !0
            },
            dataType: "json",
            success: function(t) {
                "success" == t.status ? (Toast.fire({
                    type: t.status,
                    title: t.message
                }), setTimeout(() => {
                    window.location.href = `${baseUrl}${currentData}s`
                }, 2e3)) : Toast.fire({
                    type: "error",
                    title: t.message
                })
            },
            complete: function(t) {
                $(".main-content-loader.main-body-loader").css({
                    display: "none"
                }), a.prop({
                    disabled: !1,
                    title: ""
                }).html('<i class="fa fa-upload"></i> Continue Data Import')
            },
            error: function(t) {
                Toast.fire({
                    type: "error",
                    title: "Sorry! An error was encountered while processing the request"
                }), a.prop({
                    disabled: !1,
                    title: ""
                }).html('<i class="fa fa-upload"></i> Continue Data Import'), $(".main-content-loader.main-body-loader").css({
                    display: "none"
                })
            }
        }))
    });
    var a = () => {
            var t = new Array,
                e = 0;
            $.each($('div[class~="csv-rows-content"] select'), function(e, a) {
                t.push($(this).val())
            }), $.each(t, function(t, a) {
                -1 === $.inArray(a, acceptedArray) && e++
            }), 0 != e ? ($('div[class~="file-checker"]').css("display", "block"), e > 1 ? $('div[class~="file-checker"]').html(`<h2>There are <span class="text-danger">${e} columns</span> that are not matched in the uploaded file.</h2>`) : $('div[class~="file-checker"]').html(`<h2>There is <span class="text-danger">${e} column</span> not matched in the uploaded file.</h2>`), $('button[class~="upload-button"]').css("display", "none"), $('button[class~="cancel-button"]').css("display", "none")) : ($('button[class~="upload-button"]').css("display", "inline-block"), $('button[class~="cancel-button"]').css("display", "inline-block"), $('div[class~="file-checker"]').html(`<h2>All matched! Ready for us to upload the ${currentData}s information?.</h2>`)), $('div[class~="upload-text"]').removeClass("hidden"), $('button[class~="cancel-button"]').css("display", "inline-block"), $('div[class="form-content-loader"]').css("display", "none"), $('form[class="csvDataImportForm"]').css("display", "none")
        },
        s = () => {
            $('div[class~="csv-rows-content"] select').on("change", function(e, s) {
                var n = $(this);
                if (thisValue = n.val(), thisId = n.data("id"), -1 === $.inArray(thisValue, t) && -1 !== $.inArray(thisValue, acceptedArray)) $(`div[data-row="${thisId}"] div[class="text-center"]`).html('<h3 class="text-success"><i class="fa fa-check-circle"></i> Valid Column</h3>'), $(`div[data-row="${thisId}"] select`).attr("data-name", thisValue), t.push(thisValue);
                else if (-1 !== $.inArray(thisValue, t)) {
                    var o = $(`select[data-name="${thisValue}"]`),
                        r = o.data("id");
                    $(`div[data-row="${thisId}"] select`).attr("data-name", thisValue), $(`div[data-row="${thisId}"] div[class="text-center"]`).html('<h3 class="text-success"><i class="fa fa-check-circle"></i> Valid Column</h3>'), $(`div[data-row="${r}"] div[class="text-center"]`).html('<h3 class="text-danger"><i class="fa fa-exclamation-triangle"></i> Unmatched Column</h3>'), o.val("null").change()
                } else -1 === $.inArray(thisValue, t) && -1 === $.inArray(thisValue, acceptedArray) && ($(`div[data-row="${thisId}"] select`).attr("data-name", "null"), $(`div[data-row="${thisId}"] div[class="text-center"]`).html('<h3 class="text-danger"><i class="fa fa-exclamation-triangle"></i> Unmatched Column</h3>'));
                a()
            })
        },
        n = (e, n) => {
            var o = "",
                r = $('div[class~="csv-rows-content"] div[class="form-row"] select').html(),
                l = 0;
            $('div[class~="csv-rows-content"]').html(""), $.each(e, async function(e, a) {
                var s, n;
                o = `<div class="col-md-6 col-sm-12 col-lg-3" style="min-width:250px" data-row="${l}">\n                <div class="form-row">\n                    <div class="text-center" style="width:100%"></div>\n                    <select data-name="${a}" data-id="${e}" name="first_col_${l}" id="first_col_${l}" class="form-control selectpicker">\n                        ${r}\n                    </select>\n                    <div style="width:100%; background:#fff; border-radius:5px; padding-top:10px; margin-top: 5px" class="csv-row-data-${l} mb-3"></div>\n                </div>\n            </div>`, $('div[class~="csv-rows-content"]').append(o), l++, await (s = e, n = a, void(-1 !== $.inArray(n, acceptedArray) ? ($(`div[data-row="${s}"] div[class="text-center"]`).html('<h3 class="text-success"><i class="fa fa-check-circle"></i> Valid Column</h3>'), $(`select[name="first_col_${s}"]`).val(n).change(), t.push(n)) : $(`div[data-row="${s}"] div[class="text-center"]`).html('<h3 class="text-danger"><i class="fa fa-exclamation-triangle"></i> Unmatched Column</h3>')))
            });
            var c = 0;
            $.each(n, function(t, e) {
                $.each(e, function(t, a) {
                    $(`div[class~="csv-row-data-${t}"]`).append(`<p style="padding-left: 5px" data-row-id="${c}" data-column-id="${t}" class="border-bottom pb-2">${e[t]}</p>`)
                }), c++
            }), s(), a(), $('input[name="csv_file"]').val(""), $('select[class~="selectpicker"]').select2({
                width: "100%"
            })
        };
    $('input[id="csv_file"]').change(function() {
        var t, e = new FormData,
            a = $('input[id="csv_file"]')[0].files[0];
        e.append("csv_file", a), t = e, $('div[class="form-content-loader"]').css("display", "flex"), $.ajax({
            type: "POST",
            url: `${baseUrl}aj/importManager/loadCSV`,
            data: t,
            dataType: "JSON",
            contentType: !1,
            cache: !1,
            processData: !1,
            success: function(t) {
                n(t.column, t.csvData), $('div[class~="csv-rows-counter"]').html(`A total of <strong>${t.data_count} items</strong> will be imported.`)
            },
            error: function(t) {
                Toast.fire({
                    type: "error",
                    title: "Sorry! An unknown file type was uploaded."
                }), $('input[name="csv_file"]').val(""), $('div[class="form-content-loader"]').css("display", "none")
            }
        })
    })
});
var resetProductForm = () => {
    $('div[class~="existing-product"]').addClass("hidden"), $('div[class~="new-product"], div[class~="new-product-content"]').removeClass("hidden"), $('form[id="addProductForm"] [class="modal-title"]').html("Add New Product"), $('form[id="addProductForm"] button[type="submit"]').html("Add Product"), $('form[id="addProductForm"] input[name="price"]').val(""), $('form[id="addProductForm"] input[name="title"]').val(""), $('div[class="form-content-loader"]').css("display", "none"), $('form[id="addProductForm"] input[name="cost"]').val(), $('form[id="addProductForm"] input[name="threshold"]').val(), $('form[id="addProductForm"] select[name="product_id"], form[id="addProductForm"] select[name="category"]').val("null").change(), $('form[id="addProductForm"] textarea[name="description"]').val(""), $('form[id="addProductForm"] input[name="product_image"]').val(""), $('form[id="addProductForm"] select[name="product_type"]').val("New").change()
};
$('button[class~="pop-new-modal"]').on("click", function() {
    resetProductForm()
});
var formControls = () => {
        $('div[class~="update-stock-rows"] select[name^="product_id_"]').on("change", function() {
            let t = $(this).children("option:selected").data("cost-price"),
                e = $(this).children("option:selected").data("retail-price"),
                a = $(this).children("option:selected").data("threshold"),
                s = $(this).data("row");
            $(`div[class~="update-stock-rows"] input[name="price_${s}"]`).val(e), $(`div[class~="update-stock-rows"] input[name="cost_${s}"]`).val(t), $(`div[class~="update-stock-rows"] input[name="threshold_${s}"]`).val(a)
        })
    },
    transferProduct = t => {
        let e = currentBranchId;
        $.ajax({
            url: baseUrl + "aj/inventoryManagement",
            type: "POST",
            dataType: "json",
            data: {
                getWarehouseProduct: !0,
                productId: t,
                transferFrom: e
            },
            cache: !1,
            beforeSend: function() {
                $(".transferProductModal").modal("show")
            },
            success: function(t) {
                "success" == t.status ? ($(".prodImg").attr("src", `${baseUrl}${t.product.image}`), $(".prodName").html(t.product.product_title), $(".prodQty").html(`${t.product.quantity} Quantity Available`), $('div[class~="transferProductModal"] [name="transferProductQuantity"]').attr("max", t.product.quantity), $('div[class~="transferProductModal"] [name="transferProductID"]').val(t.product.product_id)) : $(".prodName").html('<p class="text-danger">Product Not Found</p>')
            },
            complete: function(t) {}
        })
    };
$('select[class~="selectpicker"]').select2();
var submitTransferProduct = () => {
    $("form[class~='submit-transfer-product']").on("submit", function(t) {
        t.preventDefault();
        let e = $(".transfer-form-message");
        "null" == $("form[class~='submit-transfer-product'] select[name=\"branchId\"]").val() ? Toast.fire({
            type: "error",
            title: "Please select branch to transfer items to continue."
        }) : confirm("Do you want to transfer product now?") && $.ajax({
            url: baseUrl + "aj/inventoryManagement/submitTransferProduct",
            type: "POST",
            dataType: "json",
            data: $(this).serialize() + "&request=submitTransferProduct",
            cache: !1,
            beforeSend: function() {
                $('div[class="form-content-loader"]').css("display", "flex"), $("*", ".submit-transfer-product").prop("disabled", !0)
            },
            success: function(t) {
                1 == t.status ? (Toast.fire({
                    type: "success",
                    title: "Product Successfully Transfered"
                }), $(".submit-transfer-product")[0].reset(), clearAllRows(), fetchAllProducts(branchID), setTimeout(function() {
                    $(".transferProductModal").modal("hide")
                }, 2e3)) : Toast.fire({
                    type: "error",
                    title: t.message
                })
            },
            error: function() {
                e.html('\n                        <p class="alert alert-danger"></p>\n                    '), Toast.fire({
                    type: "error",
                    title: "Error Processing Request"
                }), $('div[class="form-content-loader"]').css("display", "none")
            },
            complete: function() {
                $('div[class="form-content-loader"]').css("display", "none"), $("*", ".submit-transfer-product").prop("disabled", !1), setTimeout(function() {
                    e.empty()
                }, 3e3)
            }
        })
    })
};
submitTransferProduct();
var fetchAllProducts = (t = null, e = branch_type) => {
    $.ajax({
        url: baseUrl + "aj/inventoryManagement/getAllProducts",
        type: "POST",
        dataType: "json",
        data: {
            request: !0,
            getAllProducts: !0,
            branchID: t,
            location: e
        },
        cache: !1,
        beforeSend: function() {},
        success: function(t) {
            $('table[id="allProducts"]').dataTable().fnDestroy(), $('table[id="allProducts"]').dataTable({
                aaData: t.message,
                iDisplayLength: 10,
                buttons: ["copy", "print", "csvHtml5"],
                lengthChange: !1,
                dom: "Bfrtip",
                columns: [{
                    data: "row_id"
                }, {
                    data: "product_name"
                }, {
                    data: "category"
                }, {
                    data: "price"
                }, {
                    data: "quantity"
                }, {
                    data: "indicator"
                }, {
                    data: "action"
                }]
            })
        },
        complete: function(t) {}
    })
};
$('form[id="addProductForm"]').on("submit", function(t) {
    t.preventDefault(), $.ajax({
        type: "POST",
        url: $(this).attr("action"),
        data: new FormData(this),
        dataType: "JSON",
        contentType: !1,
        cache: !1,
        processData: !1,
        beforeSend: function() {
            $('div[class="form-content-loader"]').css("display", "flex")
        },
        success: function(t) {
            Toast.fire({
                type: t.status,
                title: t.message
            }), "success" == t.status && (fetchAllProducts(t.branchId), resetProductForm(), $('form[id="addProductForm"]')[0].reset()), $('div[class="form-content-loader"]').css("display", "none")
        },
        error: function(t) {
            $('div[class="form-content-loader"]').css("display", "none"), Toast.fire({
                type: "error",
                title: "Error processing request"
            })
        }
    })
});
var clearStockUpdateRows = () => {
    var t = $('div[class~="update-stock-rows"] div[data-row]').length;
    t > 1 && $.each($('div[class~="update-stock-rows"] div[data-row]'), function(e, a) {
        1 != t && ($(`div[class~="update-stock-rows"] div[data-row="${t}"]`).remove(), t--)
    })
};
$('form[id="updateWareHouseStock"]').on("submit", function(t) {
    t.preventDefault();
    var e = [];
    if ($.each($('div[class~="update-stock-rows"] div[class~="stock-listing"]'), function(t, a) {
            var s = $(this).attr("data-row");
            "null" != $(`select[id="product_id_${s}"]`).val() && e.push($(`select[id="product_id_${s}"]`).val() + "|" + $(`input[name="cost_${s}"]`).val() + "|" + $(`input[name="price_${s}"]`).val() + "|" + $(`input[name="quantity_${s}"]`).val() + "|" + $(`input[name="threshold_${s}"]`).val())
        }), e.length < 1) Toast.fire({
        type: "error",
        title: "Please select at least one item to continue."
    });
    else if (confirm("Do you confirm updating the stock levels?")) {
        var a = e.join(",");
        $.ajax({
            url: `${baseUrl}aj/inventoryManagement/updateWareHouseStock`,
            data: {
                updateWareHouseStock: !0,
                stockQuantities: a
            },
            type: "POST",
            dataType: "json",
            beforeSend: function() {
                $('div[class="form-content-loader"]').css("display", "flex")
            },
            success: function(t) {
                "error" == t.status ? Toast.fire({
                    type: "error",
                    title: t.message
                }) : "success" == t.status && ($('div[id="updateProductModal"]').modal("hide"), Toast.fire({
                    type: "success",
                    title: t.message
                }), $('form[id="updateWareHouseStock"]')[0].reset(), $('form[id="updateWareHouseStock"] select[name="product_id_1"]').val("null").change(), fetchAllProducts(currentBranchId), clearStockUpdateRows())
            },
            complete: function(t) {
                $('div[class="form-content-loader"]').css("display", "none")
            },
            error: function(t) {
                Toast.fire({
                    type: "error",
                    title: "Error Processing Request."
                }), $('div[class="form-content-loader"]').css("display", "none")
            }
        })
    }
}), $("#customCheck_checkAll").on("click", function() {
    $(this).is(":checked") && $(this).addClass("btn"), $(".alltransferProducts").prop("checked", $(this).prop("checked"))
}), $(".transfer-selected-products").on("click", function(t) {
    t.preventDefault(), $(".transferBulkProductModal").modal("show")
});
var removeRow = () => {
        $('span[class~="remove-row"]').on("click", function() {
            let t = $(this).attr("data-value");
            $(`div[class~="bulk-products-list"] [data-row="${t}"]`).remove()
        })
    },
    removeAppendRow = () => {
        $('span[class~="remove-this-row"]').on("click", function() {
            let t = $(this).attr("data-value");
            console.log(t), $(`div[class~="update-stock-rows"] div[data-row="${t}"]`).remove()
        })
    },
    clearAllRows = () => {
        var t = $('div[class~="bulk-products-list"] [data-row]').length;
        t > 1 && $.each($('div[class~="bulk-products-list"] [data-row]'), function(e, a) {
            1 != t && ($(`div[class~="bulk-products-list"] [data-row="${t}"]`).remove(), t--)
        })
    },
    maximumValue = () => {
        $('div[class~="bulk-products-list"] [data-row] select').on("change", function(t) {
            let e = $(this).children("option:selected").data("quantity"),
                a = $(this).parents('div[class~="products-listing"]:first').attr("data-row");
            $(`input[id="i_product_${a}"]`).attr("max", e)
        }), $('div[class~="bulk-products-list"] [data-row] input').on("input", function(t) {
            let e = $(this),
                a = parseInt(e.attr("max"));
            parseInt(e.val()) > a && e.val(a)
        }), $('form[class~="submit-transfer-product"] input').on("input", function(t) {
            let e = $(this),
                a = parseInt(e.attr("max"));
            parseInt(e.val()) > a && e.val(a)
        })
    };
$('button[class~="topup-products"]').on("click", function(t) {
    let e = $('div[class~="bulk-products-list"] [data-row]:last select').html();
    var a = $('div[class~="bulk-products-list"] [data-row]').length;
    if (a++, $('div[class~="bulk-products-list"] [data-row]:last select > option').length == a) return !1;
    $('div[class~="bulk-products-list"] [data-row]:last').after(`\n        <div class="products-listing mb-2" data-row="${a}">\n            <div class="row">\n                <div class="col-sm-6">\n                    <select name="products[]" id="s_product_${a}" class="form-control selectpicker">\n                        ${e}\n                    </select>\n                </div>\n                <div class="col-sm-5">\n                    <input value="0" type="number" id="i_product_${a}" class="form-control" min="1" placeholder="Product Quantity" name="transferProductQuantity" required="">\n                </div>\n                <div class="col-sm-1">\n                    <div class="text-center">\n                        <span class="remove-row" style="font-weight:bold; font-size:16px; line-height:2.5rem; color:brown; cursor:pointer" data-value="${a}">X</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    `), $(".selectpicker").select2(), removeRow(), maximumValue()
}), maximumValue(), $('div[class~="update-stock-rows"] button[class~="append-row"]').on("click", function(t) {
    let e = $('div[class~="update-stock-rows"] div[data-row]:last select').html();
    var a = $('div[class~="update-stock-rows"] div[data-row]').length;
    a++;
    let s = $('div[class~="update-stock-rows"] div[data-row]:last select > option').length;
    if (console.log(a, s), s == a) return !1;
    $('div[class~="update-stock-rows"] div[data-row]:last').after(`\n        <div class="row stock-listing" data-row="${a}">\n            <div class="col-md-4 mb-3">\n                <div>\n                    <select data-row="${a}" name="product_id_${a}" id="product_id_${a}" class="form-control selectpicker">\n                            ${e}\n                    </select>\n                </div>\n            </div>\n            <div class="col-md-2 mb-3">\n                <div class="input-group">\n                    <div class="input-group-prepend"><span class="input-group-text">${companyVariables.cur}</span></div>\n                    <input type="number" step="0.1" value="0.00" class="form-control" name="cost_${a}">\n                </div>\n            </div>\n            <div class="col-md-2 mb-3">\n                <div class="input-group">\n                    <div class="input-group-prepend"><span class="input-group-text">${companyVariables.cur}</span></div>\n                    <input type="number" step="0.1" value="0.00" class="form-control" name="price_${a}">\n                </div>\n            </div>\n            <div class="col-md-2 mb-3">\n                <input type="number" step="1" value="0" class="form-control" min="1" name="quantity_${a}">\n            </div>\n            <div class="col-md-1 mb-3">\n                <input type="number" step="1" value="0" class="form-control" min="1" name="threshold_${a}">\n            </div>\n            <div class="col-md-1 text-center">\n                <span class="remove-this-row" style="font-weight:bold; font-size:16px; line-height:2.5rem; color:brown; cursor:pointer" data-value="${a}">X</span>\n            </div>                        \n        </div>\n    `), $('select[class~="selectpicker"]').select2(), removeAppendRow(), formControls()
}), formControls(), $("form[class~='submit-bulk-transfer-product']").on("submit", function(t) {
    t.preventDefault();
    $(this).serialize();
    var e = [];
    $.each($(".bulk-products-list .products-listing"), function(t, a) {
        var s = $(this).attr("data-row");
        0 != parseInt($(`input[id^="i_product_${s}"]`).val()) && e.push($(`select[id^="s_product_${s}"]`).val() + "=" + $(`input[id^="i_product_${s}"]`).val())
    }), e.length < 1 ? Toast.fire({
        type: "error",
        title: "Please select at least one item to continue."
    }) : "null" == $("form[class~='submit-bulk-transfer-product'] select[name=\"branchId\"]").val() ? Toast.fire({
        type: "error",
        title: "Please select branch to transfer items to continue."
    }) : confirm("Do you want to transfer these products?") && $.ajax({
        url: baseUrl + "aj/inventoryManagement/bulkTransferProducts",
        type: "POST",
        dataType: "json",
        data: $(this).serialize() + "&request=true&bulkTransferProducts=true&productIds=" + e,
        cache: !1,
        beforeSend: function() {
            $('div[class="form-content-loader"]').css("display", "flex"), $("*", ".submit-bulk-transfer-product").prop("disabled", !0)
        },
        success: function(t) {
            1 == t.status ? (Toast.fire({
                type: "success",
                title: "Product Successfully Transfered"
            }), $(".submit-bulk-transfer-product")[0].reset(), $(".submit-bulk-transfer-product select").val("null").change(), clearAllRows(), setTimeout(function() {
                window.location.href = `${baseUrl}inventory/inventory-details/${branchID}`
            }, 1500)) : Toast.fire({
                type: "error",
                title: t.message
            })
        },
        error: function() {
            Toast.fire({
                type: "error",
                title: "Error Processing Request"
            }), $('div[class="form-content-loader"]').css("display", "none")
        },
        complete: function() {
            $("*", ".submit-bulk-transfer-product").prop("disabled", !1), $('div[class="form-content-loader"]').css("display", "none"), setTimeout(function() {
                $('div[class="transfer-bulk-form-message"]').empty()
            }, 3e3)
        }
    });
});
if($(`div[id="payment_options"]`).length) {
function loadPaymentOptions() {       
  $.ajax({
    url: `${baseUrl}aj/branchManagment/loadPaymentOptions`,
    data: { loadPaymentOptions: true },
    type: "POST",
    dataType: "JSON",
    success: function(resp) {
      if(resp.status == 200) {
        var paymentOptions = resp.message;
        $.each($(`div[id="payment_options"] div[class="col-lg-4"] input`), function(i, e) {
          if(($.inArray($(this).attr(`data-module`), paymentOptions) !== -1) && ($(this).attr('data-value') == 'checked')) {
            $(this).attr('checked', true);
            $(this).parent('label').addClass('active');
          } else if(($.inArray($(this).attr(`data-module`), paymentOptions) === -1) && ($(this).attr('data-value') == 'unchecked')) {
            $(this).attr('checked', true);
            $(this).parent('label').addClass('active');
          }
        });
      } else {
        $.each($(`div[id="payment_options"] div[class="col-lg-4"] input`), function(i, e) {
          if(($.inArray($(this).attr(`data-module`), paymentOptions) === -1) && ($(this).attr('data-value') == 'unchecked')) {
            $(this).attr('checked', true);
            $(this).parent('label').addClass('active');
          }
        });
      }
    }, complete: function(data) {
      $(`div[class="form-content-loader"]`).css("display","none");
    }, error: function(err) {
      $(`div[class="form-content-loader"]`).css("display","none");
    }
  })
}
loadPaymentOptions();
}
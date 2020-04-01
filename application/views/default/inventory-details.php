<?php
$PAGETITLE = "Inventory";
global $admin_user;

// ensure that the user is logged in
if(!$admin_user->logged_InControlled()) {
    include_once "login.php";
    exit;
}

// if the 1st item is not inventory
if(!confirm_url_id(0, 'inventory')) {
    show_error('Page Not Found', 'Sorry the page you are trying to view does not exist on this server');
    exit;
}

global $accessObject;
// create a new object for the access level
$accessObject->userId = $session->userId;

// create a new object for the access level
$accessObject->userId = $session->userId;

// continue
$productsObj = load_class("Products", "controllers");

$accessChecker = $accessObject->hasAccess('inventory_branches', 'products');

if(!$accessChecker) {
    $branchID = $session->branchId;
} else {
    $branchID = (isset($SITEURL[2])) ? xss_clean($SITEURL[2]) : $session->branchId;
}
$categories = $productsObj->getCategories();
$allBranches = $productsObj->getAllBranches($branchID);
$options = "";

$product = $productsObj->getProduct(false, $branchID);
$allProducts = $productsObj->all(false, $branchID);
$transferFrom = $branchID;

if ($allBranches != false) {
    foreach ($allBranches as $branch) {
        if ($branch->id == $branchID) { 
            $PAGETITLE = $branch->branch_name . " Inventory ";
        }

        if ($branchID != $branch->id) {
            $options .= "<option value=\"{$branch->id}\">{$branch->branch_name}</option>";
        }
    }
}

$defaultImg = $config->base_url("assets/images/products/default.png");

// if the customer name was found
if(isset($branch->branch_name)) {
    // include the important files
    require_once "headtags.php";
    
    global $branchData, $clientData;

    $session->currentBranchId = $branchID;
?>
<?= connectionLost(); ?>
<!-- Page Content-->
<!-- Header -->
<div class="header bg-primary pb-6">
  <div class="container-fluid">
    <div class="header-body">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
              <li class="breadcrumb-item"><a href="<?= $baseUrl ?>"><i class="fas fa-home"></i> Dashboard</a></li>
              <li class="breadcrumb-item"><a href="<?= $baseUrl ?>/inventory"><i class="ni ni-ungroup"></i> Inventory</a></li>
              <li class="breadcrumb-item"><a href="javascript:void(0)"><?= $PAGETITLE ?></a></li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- Page content -->
<div class="container-fluid mt--6">
  
  <div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                <p class="text-muted mb-4 font-13">
                    All available products in <?= strtolower($PAGETITLE) ?>.
                </p>
                <p>
                    <a href="<?= $config->base_url('inventory') ?>" class="btn btn-primary waves-light">
                        <i class="fa fa-arrow-left"></i> Back
                    </a>
                    <?php if($accessChecker) { ?>
                        <button type="button" class="btn btn-primary waves-effect waves-light transfer-selected-products">
                            <i class="fa fa-share"></i> Transfer
                        </button>
                        <?php if ($branch->branch_type == "Warehouse") { ?>
                        <button type="button" class="btn btn-success waves-effect waves-light float-right ml-2" data-toggle="modal" data-animation="bounce" data-target="#updateProductModal">
                            <i class="fa fa-upload"></i> Update Stock
                        </button>
                        <button type="button" class="btn btn-primary waves-effect waves-light float-right ml-2 pop-new-modal" data-toggle="modal" data-animation="bounce" data-target="#addProductModal">
                            + Add New
                        </button>
                        <?php } ?>
                    <?php } ?>
                </p>
                <div class="table-responsive">
                    <table id="allProducts" class="table nowrap datatable-buttons">
                        <thead>
                        <tr>
                            <th class="text-center"></th>
                            <th>Item Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th class="text-center">Stock</th>
                            <th class="text-center"></th>
                            <th class="text-center"></th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  </div>

  <?php if($accessChecker) { ?>
  <!-- Add Product Modal -->
  <?php if ($branch->branch_type == "Warehouse") { ?>
  <form id="addProductForm" autocomplete="Off" enctype="multipart/form-data" class="needs-validation" novalidate="" method="post" action="<?= $config->base_url('doprocess_product/addProduct'); ?>">
      <div class="modal fade" id="addProductModal">
          <div class="modal-dialog modal-lg">
              <div class="modal-content">
                  <?= form_loader(); ?>
                  <div class="modal-header">
                      <h5 class="modal-title">Add New Product</h5>
                      <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                  </div>
                  <div class="modal-body">

                      <div class="form-row">
                          <div class="col-md-6">
                              <div class="col-md-12 mb-3 hidden">
                                  <label for="product_type" class="text-primary-light">Add New Product</label>
                                  <select name="product_type" readonly id="product_type" class="form-control">
                                      <option value="New">New Product</option>
                                  </select>
                              </div>
                              
                              <div class="col-md-12 mb-3">
                                  <div class="new-product">
                                      <label for="title" class="text-primary-light">Product Title</label>
                                      <input type="text" placeholder="Enter product title" class="form-control" name="title" required="">
                                  </div>
                                  <div class="existing-product hidden">
                                      <label for="product_id" class="text-primary-light">Select Product</label>
                                      <select name="product_id" id="product_id" class="form-control selectpicker">
                                          <option value="null">Please Select</option>
                                          <?php
                                          foreach ($allProducts as $eachProduct) {
                                              echo "<option data-cost-price=\"{$eachProduct->cost_price}\" data-retail-price=\"{$eachProduct->product_price}\" data-threshold=\"{$eachProduct->threshold}\" data-quantity=\"{$eachProduct->quantity}\" data-image=\"{$eachProduct->image}\" value=\"{$eachProduct->pid}\">{$eachProduct->product_title} ({$eachProduct->quantity} left)</option>";
                                          }
                                          ?>
                                      </select>
                                  </div>
                              </div>
                              <div class="col-md-12 mb-3">
                                  <label for="cost" class="text-primary-light">Supply Cost</label>
                                  <div class="input-group">
                                      <div class="input-group-prepend"><span class="input-group-text">GH&cent;</span></div>
                                      <input type="number" step="0.1" value="0.00" class="form-control" name="cost">
                                  </div>
                              </div>
                              <div class="col-md-12 mb-3">
                                  <label for="price" class="text-primary-light">Retail Price</label>
                                  <div class="input-group">
                                      <div class="input-group-prepend"><span class="input-group-text">GH&cent;</span></div>
                                      <input type="number" step="0.1" value="0.00" class="form-control" name="price">
                                  </div>
                              </div>
                              <div class="col-md-12 mb-3">
                                  <label for="quantity" class="text-primary-light">Quantity</label>
                                  <input type="number" step="1" value="0" class="form-control" min="0" name="quantity">
                              </div>
                              <div class="col-md-12 mb-3">
                                  <label for="threshold" class="text-primary-light">Threshold</label>
                                  <input type="number" step="1" value="0" class="form-control" min="0" name="threshold">
                              </div>
                          </div>
                          <div class="col-md-6">
                              <div class="col-md-12 mb-4 new-product-content">
                                  <label for="category" class="text-primary-light">Product Category</label>
                                  <select class="form-control selectpicker" name="category">
                                      <option value="null">Select category...</option>
                                      <?php
                                      array_map(function($cat){
                                          echo "<option value='$cat->category_id'>$cat->category</option>";
                                      }, $categories);
                                      ?>
                                  </select>
                              </div>                
                              <div class="col-md-12 mb-3 new-product-content">
                                  <label for="phone2" class="text-primary-light">Product Description</label>
                                  <textarea class="form-control" name="description" rows="3" placeholder="Describe product"></textarea>
                              </div>
                              <div class="col-md-12 mb-3">
                                  <label for="product_image">Product Image</label>
                                  <input type="file" name="product_image" id="product_image" class="form-control">
                                  <input type="hidden" name="addProduct" value="addProduct">
                              </div>
                              <div class="col-md-12 mb-3 existing-image hidden">
                                  <img  src="<?= $config->base_url('assets/images/products/default.png') ?>" alt="" class=" mx-auto  d-block">
                              </div>
                          </div>

                      </div>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
                      <button type="submit" class="btn btn-primary">Add Product</button>
                  </div>
                  <div class="form-results text-center"></div>
              </div>

          </div>
      </div>
  </form> 
  <form id="updateWareHouseStock" enctype="multipart/form-data" class="needs-validation" novalidate="" method="post" action="<?= $config->base_url('doprocess_product/updateWareHouseStock'); ?>">
      <div class="modal fade" id="updateProductModal">
          <div class="modal-dialog modal-lg">
              <div class="modal-content">
                  <?= form_loader(); ?>
                  <div class="modal-header">
                      <h5 class="modal-title">Update Products Stock</h5>
                      <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                  </div>
                  <div class="modal-body update-stock-rows">

                      <div class="row stock-listing" data-row="1">
                              
                          <div class="col-md-4 mb-3">
                              <div>
                                  <label for="product_id" class="text-primary-light">Select Product</label>
                                  <select data-row="1" name="product_id_1" id="product_id_1" class="form-control selectpicker2">
                                      <option value="null">Please Select</option>
                                      <?php
                                      foreach ($allProducts as $eachProduct) {
                                          echo "<option data-cost-price=\"{$eachProduct->cost_price}\" data-retail-price=\"{$eachProduct->product_price}\" data-threshold=\"{$eachProduct->threshold}\" data-quantity=\"{$eachProduct->quantity}\" data-image=\"{$eachProduct->image}\" value=\"{$eachProduct->pid}\">{$eachProduct->product_title} ({$eachProduct->quantity} left)</option>";
                                      }
                                      ?>
                                  </select>
                              </div>
                          </div>
                          <div class="col-md-2 mb-3">
                              <label for="cost" class="text-primary-light">Supply Cost</label>
                              <div class="input-group">
                                  <div class="input-group-prepend"><span class="input-group-text">GH&cent;</span></div>
                                  <input type="number" step="0.1" value="0.00" class="form-control" name="cost_1">
                              </div>
                          </div>
                          <div class="col-md-2 mb-3">
                              <label for="price" class="text-primary-light">Retail Price</label>
                              <div class="input-group">
                                  <div class="input-group-prepend"><span class="input-group-text">GH&cent;</span></div>
                                  <input type="number" step="0.1" value="0.00" class="form-control" name="price_1">
                              </div>
                          </div>
                          <div class="col-md-2 mb-3">
                              <label for="quantity" class="text-primary-light">Quantity</label>
                              <input type="number" step="1" value="0" class="form-control" min="1" name="quantity_1">
                          </div>
                          <div class="col-md-1 mb-3">
                              <label for="threshold" class="text-primary-light">Threshold</label>
                              <input type="number" step="1" value="0" class="form-control" min="1" name="threshold_1">
                          </div>
                          <div class="col-md-1 text-center">
                              <label for="threshold" class="text-primary-light">Add</label>
                              <button type="button" class="btn append-row btn-primary"><i class="fa fa-plus"></i></button>
                          </div>                        
                      </div>

                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
                      <button type="submit" class="btn btn-primary">Update Stock</button>
                  </div>
                  <div class="form-results text-center"></div>
              </div>
          </div>
      </div>
  </form> 
  <?php } ?>
  
  <div class="modal fade transferProductModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title mt-0" id="myLargeModalLabel">Inventory Single Product Transfer</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
              </div>
              <div class="modal-body">
                  <div class="transfer-form-message"></div>
                  <form class="submit-transfer-product" method="POST">
                      <div class="row justify-content-center mb-1">
                          <div class="col-md-6">
                              <div class="form-group text-center">
                                  <img src="<?= $defaultImg ?>" class="img-fluid prodImg" style="border-radius: 10px;">
                                  <h5 class="prodName">Product Name</h5>
                                  <p class="prodQty"></p>
                              </div>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-md-6">
                              <div class="form-group">
                                  <label for="Location">Store Location</label><br>
                                  <select class="custom-select selectpicker" name="branchId" required>
                                      <option selected value="null">Select</option>
                                      <?php foreach($productsObj->getAllBranches() as $eachBranch) { ?>
                                          <?php if($eachBranch->id != $branchID) { ?>
                                              <?= "<option value=\"{$eachBranch->id}\">{$eachBranch->branch_name} - {$eachBranch->branch_type} (".(($eachBranch->status == 1) ? "Active" : "Inactive").")</option>"; ?>
                                          <?php } ?>
                                      <?php } ?>
                                  </select>
                              </div>
                          </div>
                          <div class="col-md-6">
                              <div class="form-group">
                                  <label for="PhoneNo">Quantity</label>
                                  <input type="number" class="form-control" min="1" placeholder="Product Quantity" name="transferProductQuantity" required="">
                              </div>
                          </div>
                      </div>
                      <input type="hidden" name="transferProductID" value="null">
                      <input type="hidden" name="transferFrom" value="<?= $transferFrom ?>">
                      <button type="submit" class="btn btn-sm btn-primary float-right">Transfer</button>  
                  </form>  
              </div>
          </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->

  <div class="modal fade transferBulkProductModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
          <div class="modal-content">
              <div class="form-content-loader" style="display: none">
                  <div class="offline-content text-center">
                      <p><i class="fa fa-spin fa-spinner fa-3x"></i></p>
                  </div>
              </div>
              <div class="modal-header">
                  <h5 class="modal-title mt-0" id="myLargeModalLabel">Inventory Transfer</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
              </div>
              <div class="modal-body">
                  <div class="transfer-bulk-form-message"></div>
                  <form class="submit-bulk-transfer-product" method="POST">
                      <div class="row justify-content-center">
                          <div class="col-md-4">
                              <div class="form-group">
                                  <label for="Location">Store Location</label><br>
                                  <select class="custom-select selectpicker" name="branchId" required>
                                      <option value="null">Select</option>
                                      <?php foreach($productsObj->getAllBranches() as $eachBranch) { ?>
                                          <?php if($eachBranch->id != $branchID) { ?>
                                              <?= "<option value=\"{$eachBranch->id}\">{$eachBranch->branch_name} - {$eachBranch->branch_type} (".(($eachBranch->status == 1) ? "Active" : "Inactive").")</option>"; ?>
                                          <?php } ?>
                                      <?php } ?>
                                  </select>
                              </div>
                          </div>
                          <div class="col-lg-2">
                              <div class="form-group">
                                  <label for="button">&nbsp;</label><br>  
                                  <button type="button" class="btn btn-primary topup-products">+ Add More</button>
                              </div>
                          </div>
                      </div>
                      <br>
                      <div class="bulk-products-list">
                          <div class="products-listing mb-2" data-row="1">
                              <div class="row">
                                  <div class="col-sm-6">
                                      <label for="s_product_1">Select Product</label>
                                      <select name="products[]" id="s_product_1" class="form-control selectpicker">
                                          <option value="null">Select Product</option>
                                          <?php
                                          foreach ($allProducts as $eachProduct) {
                                              // show only products with quantities more than 0
                                              if($eachProduct->quantity > 0) {
                                                  // print the products list
                                                  echo "<option data-cost-price=\"{$eachProduct->cost_price}\" data-retail-price=\"{$eachProduct->product_price}\" data-threshold=\"{$eachProduct->threshold}\" data-quantity=\"{$eachProduct->quantity}\" data-image=\"{$eachProduct->image}\" value=\"{$eachProduct->pid}\">{$eachProduct->product_title} ({$eachProduct->quantity} left)</option>";
                                              }
                                          }
                                          ?>
                                      </select>
                                  </div>
                                  <div class="col-sm-5">
                                      <label for="s_product_1">Product Quantity</label>
                                      <input type="number" value="" id="i_product_1" class="form-control" min="1" placeholder="Product Quantity" name="transferProductQuantity" required="">
                                  </div>
                              </div>
                          </div>
                      </div>
                      <br>
                      <input type="hidden" name="transferProductID" value="null">
                      <input type="hidden" name="transferFrom" value="<?= $transferFrom ?>">
                      <button type="submit" class="btn btn-sm btn-primary float-right">Transfer</button>  
                  </form>  
              </div>
          </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
  <?php } ?>

<?php require_once 'foottags.php'; ?>
<script type="text/javascript">
  // $(`table[id="allProducts"]`).DataTable({
  //     "iDisplayLength": 10
  // });

  var currentBranchId = '<?= $session->currentBranchId ?>',
      branchID = '<?= $branchID; ?>',
      branch_type = "<?= $branch->branch_type; ?>";
</script>
<script src="<?= $config->base_url('assets/js/inventory.js'); ?>" type="text/javascript"></script>
<script type="text/javascript">
  $(async function() {
      hideLoader();
      var offline = true;
      await doOnlineCheck().then((itResp) => {
          if(itResp == 1) {
              offline = false;
              $(`div[class~="offline-placeholder"]`).css('display','none');
          } else {
              offline = true;
              $(`div[class="connection"]`).css('display','none');
              $(`div[class~="offline-placeholder"]`).css('display','flex');
          }
      }).catch((err) => {
          offline = true;
          $(`script[data-content="transfer"]`).html(``);
          $(`div[class~="offline-placeholder"]`).css('display','flex');
          $(`div[class="connection"]`).css('display','none');
      });

      if(!offline) {
          var identifyCurrentBranch = () => {
              var site2 = branchID;
              fetchAllProducts(site2);
          }
          identifyCurrentBranch();
      }
  });
  </script>
</body>
</html>
<?php } else { ?>
    <?php show_error('Page Not Found', 'Sorry the page you are trying to view does not exist on this server'); ?>
<?php } ?>
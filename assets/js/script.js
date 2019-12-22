var prod_image  = [];
var len         = 0;
var max_image   = 4;
var base_url    = $('base').attr('href');
var url         = window.location.href;
var deletedOI   = [];
var deletedNI   = [];
var include_shopids  = [];
var exclude_shopids  = [];
var check_all_shopid = false;
$(document).ajaxStart(function(){
    $("#wait").css("display", "block");
});
$(document).ajaxComplete(function(){
    $("#wait").css("display", "none");
});
$(document).ready(function(){
    if(url.indexOf('product-list')!=-1){
        InitializeTableProduct();
    }
    if(url.indexOf('orders')!=-1){
        InitializeTableOrder();
    }
})
$(document).on('click', '#trigger-upload-images', function(){
    $('#upload-images').click();
})
$(document).on('change', '#upload-images', function(event){
    var flat=false;
    var str="";
    var st="";
    max_image = 4;
    if(url.indexOf('product-edit')!=-1){
        max_image = 4 - parseInt($(".lst-current").attr('id')) - prod_image.length + deletedNI.length;
    }
    for(var i=0;i<event.target.files.length && i<max_image; i++){
        if(event.target.files[0].size>=1000000){
            st+=event.target.files[0].name+'\n';
            flat=true;
        }
        else {
            prod_image.push(event.target.files[i]);
            str+="<li  id='box-"+(len+i)+"' class='mutual-image-box col-md-3'><img src='"+URL.createObjectURL(event.target.files[i])+"' height='100px'  class='style-img-ad' /> <i class='fa fa-trash-o size-margin deleImg image-delete' onclick=deleImg("+(len+i)+") id='"+(len+i)+"'></i></li>";
        }
    }
    
    if(flat) alert('Ảnh '+ st +' vượt quá kích thước cho phép (Vui lòng chọn ảnh nhỏ hơn 1MB)');
    len=prod_image.length;
    $(".image-lst").append(str);
});

function deleImg(id){
    deletedNI.push(id);
    $("#box-"+id).remove();
}

function deleteImageMul(i){
    deletedOI.push(i);
    $("#deleted_old_image").attr('value', deletedOI);
    var tmp=parseInt($(".lst-current").attr('id'))-1;
    $(".lst-current").attr('id', tmp);
    $('#mul-'+i).addClass('imgODeleted');
    $('#hide-box-'+i).css('display', 'flex');
}
function resume(id){
    deletedOI.splice(deletedOI.indexOf(id),1);
    $("#deleted_old_image").attr('value', deletedOI);
    var tmp=parseInt($(".lst-current").attr('id'))+1;
    $(".lst-current").attr('id', tmp);
    $("#hide-box-"+id).css('display', 'none');
    $('#mul-'+id).removeClass('imgODeleted');
}
$(document).on('click', '#trigger-upload-shoppic', function(){
    $('#upload-shoppic').click();
})
$(document).on('change', '#upload-shoppic', function(event){
    var flat=false;
    //var tmppath = URL.createObjectURL(event.target.files[0]);
    var str="";
    var st="";

    if(event.target.files[0].size>=1000000){
        st+=event.target.files[0].name+'\n';
        flat=true;
    }
    else {
        if(url.indexOf('product-edit')!=-1){
            $("#deleted_shoppic").attr('value', 1);
        }
        str+="<div class='col-md-4 images-box mutual-image-box'><img src='"+URL.createObjectURL(event.target.files[0])+"' /></div>";
    }
    if(flat) alert('Ảnh '+ st +' vượt quá kích thước cho phép (Vui lòng chọn ảnh nhỏ hơn 1MB)');
    $(".shoppic").html(str);
});

function delete_shoppic(){
    $('#hide-box-shoppic').css('display', 'flex');
    $("#deleted_shoppic").attr('value', 1);
}

function resume_shoppic(){
    $('#hide-box-shoppic').css('display', 'none');
    $("#deleted_shoppic").attr('value', 0);
}

$(document).on('click', '#trigger-upload-zhuang', function(){
    $('#upload-zhuang').click();
})
$(document).on('change', '#upload-zhuang', function(event){
    var flat=false;
    //var tmppath = URL.createObjectURL(event.target.files[0]);
    var str="";
    var st="";

    if(event.target.files[0].size>=1000000){
        st+=event.target.files[0].name+'\n';
        flat=true;
    }
    else {
        if(url.indexOf('product-edit')!=-1){
            $("#deleted_zhuang").attr('value', 1);
        }
        str+="<div class='col-md-4 images-box mutual-image-box'><img src='"+URL.createObjectURL(event.target.files[0])+"' /></div>";
    }
    if(flat) alert('Ảnh '+ st +' vượt quá kích thước cho phép (Vui lòng chọn ảnh nhỏ hơn 1MB)');
    $(".zhuang").html(str);
});

function delete_zhuang(){
    $('#hide-box-zhuang').css('display', 'flex');
    $("#deleted_zhuang").attr('value', 1);
}

function resume_zhuang(){
    $('#hide-box-zhuang').css('display', 'none');
    $("#deleted_zhuang").attr('value', 0);
}

$(document).on('change', '#anclassid', function(){
    $.ajax({
        type: "POST",
        url: "ajax_load_category.php",
        data: {'load_nclassid':1, 'anclassid':this.value},
        success: function(data)
           {
                if(data.notification.code==200){
                    if(data.shop_nclass.length>0){
                        var str = '<option value="">Select category</option>';
                        for(var i=0; i<data.shop_nclass.length; i++){
                            str+="<option value='"+data.shop_nclass[i].nclassid+"'> "+ data.shop_nclass[i].nclass +"</option>";
                        }
                        $("#nclassid").html(str);
                    }
               }
                if(url.indexOf('product-list')!=-1){
                    InitializeTableProduct();
                }
                if(url.indexOf('orders')!=-1){
                    InitializeTableOrder();
                }
           }
     });
})
$(document).on('change', '#nclassid', function(){
    $.ajax({
        type: "POST",
        url: "ajax_load_category.php",
        data: {'load_xclassid':1, 'nclassid':this.value},
        success: function(data)
           {
                if(data.notification.code==200){
                    if(data.shop_xclass.length>0){
                        var str = '<option value="">Select category</option>';
                        for(var i=0; i<data.shop_xclass.length; i++){
                            str+="<option value='"+data.shop_xclass[i].id+"'> "+ data.shop_xclass[i].xclass +"</option>";
                        }
                        $("#xclassid").html(str);
                    }
               }
               if(url.indexOf('product-list')){
                    InitializeTableProduct();
                }
           }
     });
})

$(document).on('change', "#xclassid", function(){
   if(url.indexOf('product-list')!=-1){
        InitializeTableProduct();
    }
})
$(document).on('change', ".product-status", function(){
    if(url.indexOf('product-list')!=-1){
        InitializeTableProduct();
    }
})
$(document).on('change', "#shjiaid", function(){
    if(url.indexOf('product-list')!=-1){
        InitializeTableProduct();
    }
    if(url.indexOf('orders')!=-1){
        InitializeTableOrder();
    }
})

$(document).on('change', ".zhuangtai", function(){
    if(url.indexOf('orders')!=-1){
        InitializeTableOrder();
    }
})

$(document).on('change', "#pinpainew", function(){
    $("#pinpai").val($("#pinpainew option:selected").text());
})

$(document).on('change', "#select-shopchuban", function(){
    $("#shopchuban").val(this.value);
})

$(document).on('change', "#hyj", function(){
    var original_price = $('#shichangjia').val();
    var percent = this.value;
    $("#huiyuanjia").val(parseInt(original_price)*parseFloat(percent));
})

$(document).on('change', "#vj", function(){
    var original_price = $('#shichangjia').val();
    var percent = this.value;
    $("#vipjia").val(parseInt(original_price)*parseFloat(percent));
})

$(document).on('change', "#pj", function(){
    var original_price = $('#shichangjia').val();
    var percent = this.value;
    $("#pifajia").val(parseInt(original_price)*parseFloat(percent));
})

$(document).on('click', "#sidebarCollapse", function(){
    $('#sidebar').toggleClass('active');
})

$(document).on('change', "#language", function(){
    setCookie('current-url', $(location).attr('href'), 1);
    $("#form-language").submit();
})

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
          setCookie("username", user, 365);
        }
    }
}

function InitializeTableOrder() {
    var shjiaid = $( "select#shjiaid option:checked" ).val();
    
    var zhuangtai = [];
    $('.zhuangtai:checked').each(function(i){
      zhuangtai[i] = $(this).val();
    });
    var params={};
    if(shjiaid!=''){
        params.shjiaid = shjiaid;
    }
    if(zhuangtai.length>0){
        if(zhuangtai.indexOf(0)!=-1){
           params.zhuangtai = JSON.stringify([1, 2, 3, 4, 5, 9]);
        }else{
            params.zhuangtai = JSON.stringify(zhuangtai);
        }  
    }else{
        params.zhuangtai = JSON.stringify([1, 2, 3, 4, 5, 9]);
    }
    $("#datatable-orders").dataTable().fnDestroy();
    $('#datatable-orders').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "type": "POST",
            "url": base_url + 'ajax/a_order_list.php',
            "data": params
        },
        "dom": "<'row'<'col-sm-12'f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-5'i><'col-sm-7'p>>",
        "columnDefs": [
            {
                "targets": 0,
                "data": "actionid",
                "title": "<input type='checkbox' value='all' name='checkAll' onchange='toggle_all_shopid(!check_all_shopid)' />",
                "orderable": false,
                "render": function ( data, type, row, meta ) {
                    data = parseInt(data);
                    var checked = '';
                    if((check_all_shopid && exclude_shopids.indexOf(data)==-1) || (!check_all_shopid && include_shopids.indexOf(data)!=-1)){
                        checked = 'checked';
                    }
                    return '<input type="checkbox" class="check_shopid" '+checked+' id="'+data+'" name="selectshopid[]" value="'+data+'" onchange="toggle_one_shopid('+data+')" />';
                }
            },{
                "targets": 1,
                "data": "dingdan",
                "render": function ( data, type, row, meta ) {
                    // console.log(row.username, 'row.username');
                    if(url.indexOf('orders-lalamall')!=-1){
                        var tmp= "<a href='"+base_url+"index.php?route=order-detail-lalamall&dingdan="+data+"&username="+row.username+"'>"+data+"</a>"; 
                        console.log(tmp, 'tmp');
                        return tmp;
                    }
                    else return "<a href='"+base_url+"index.php?route=order-detail&dingdan="+data+"&username="+row.username+"'>"+data+"</a>";
                }
            },{
                "targets": 2,
                "data": "wuliu"
            },{
                "targets": 3,
                "data": "username"
            },{
                "targets": 4,
                "data": "userzhenshiname"
            },{
                "targets": 5,
                "data": "zhifufangshi",
                "render": function ( data, type, row, meta ) {
                    var zhifufangshi=data;
                    switch(data){
                        case "":
                            zhifufangshi = 99999;
                            return "<span>99999</span>";
                        case null:
                           return "<span>方式不存在</span>";
                    }
                    return "<span>"+zhifufangshi+"</span>";
                }
            },{
                "targets": 6,
                "data": "songhuofangshi",
                "render": function ( data, type, row, meta ) {
                    var songhuofangshi=data;
                    switch(data){
                        case "":
                            songhuofangshi = 99999;
                            return "<span>99999</span>";
                        case null:
                           return "<span>方式不存在</span>";
                    }
                    return "<span>"+songhuofangshi+"</span>";
                }
            },{
                "targets": 7,
                "data": "zhuangtai",
                "render": function ( data, type, row, meta ) {
                    data = parseInt(data);
                    switch (data){
                        case 1:
                            return "<span style='color: red'>NOT CONFIRM</span>";
                        case 2:
                            if(row.zhifufangshi=='货到付款') return "<span>订单已确认，正在备货</span>";
                            else return "<span>已确认，未付款</span>";
                        case 3:
                            if(row.zhifufangshi=='货到付款')return "<span>SHIPPED</span>";
                            else return "<span>PAID</span>";
                        case 4: 
                            if(row.zhifufangshi=='货到付款')return "<span>货已收到，款结清</span>";
                            else return "<span>SHIPPED</span>";
                        case 5:
                            return "<span>订单完成</span>";
                        case 9:
                            return "<span>REFUND</span>";
                        default:
                            return "<span>-</span>";
                    }
                }
            }
        ]
    });
}

function InitializeTableProduct() {
    var shjiaid = $( "select#shjiaid option:checked" ).val();
    var gonghuo = $( "input[type=checkbox][name=gonghuo]:checked" ).val();
    var guanfangshenhe = $( "input[type=checkbox][name=guanfangshenhe]:checked" ).val();
    var shenhe = [];
    $('.shenhe:checked').each(function(i){
      shenhe[i] = $(this).val();
    });
    var kucun = $( "input[type=checkbox][name=kucun]:checked" ).val();
    var anclassid = $( "select#anclassid option:checked" ).val();
    var nclassid = $( "select#nclassid option:checked" ).val();
    var xclassid = $( "select#xclassid option:checked" ).val();
    console.log(shenhe, 'shenhe');
    var params={};
    if(shjiaid!=''){
        params.shjiaid = shjiaid;
    }
    if(anclassid!=''){
        params.anclassid = anclassid;
    }
    if(nclassid!=''){
        params.nclassid = nclassid;
    }
    if(xclassid!=''){
        params.xclassid = xclassid;
    }
    if(gonghuo!=''){
        params.gonghuo = gonghuo;
    }
    if(guanfangshenhe!=''){
        params.guanfangshenhe = guanfangshenhe;
    }
    if(shenhe!=''){
        params.shenhe = JSON.stringify(shenhe);
    }
    if(kucun!=''){
        params.kucun = kucun;
    }
    $("#datatable-product").dataTable().fnDestroy();
    $('#datatable-product').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "type": "POST",
            "url": base_url + 'ajax/a_product_list.php',
            "data": params
        },
        "dom": "<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-5'i><'col-sm-7'p>>",
        drawCallback: function( settings ) {
            // if(check_all_shopid){
            //     $(".check_shopid").attr('checked', true);
            // }
        },
        "buttons": [
            // {
            //     "text": 'Delete',
            //     "className": "btn btn-warning",
            //     action: function ( e, dt, node, config ) {
            //         if(!check_all_shopid && include_shopids.length==0){
            //             alert("Please select products that you want to delete");
            //         }else{
            //             var re;
            //             re = confirm("Do you want to delete this product? This action cannot be reverted");
            //             if(re){
            //                 var params={
            //                     'check_all_shopid': check_all_shopid?1:0,
            //                     'include_shopids': JSON.stringify(include_shopids),
            //                     'exclude_shopids': JSON.stringify(exclude_shopids),
            //                     'detele-shopid' : 1
            //                 };
            //                 $.ajax({
            //                     type: 'POST',
            //                     url: base_url + 'ajax/a_product.php',
            //                     data: params,
            //                     success: function(data){
            //                         console.log(data);
            //                         location.reload();
            //                     },
            //                     error: function(data){
            //                         console.log(data);
            //                     }
            //                 });
            //             }
            //         }
            //     }
            // },
            {
                "text": 'Re-sale',
                "className": "btn btn-success",
                action: function ( e, dt, node, config ) {
                    if(!check_all_shopid && include_shopids.length==0){
                        alert("Please select products that you want to re-sale");
                    }else{
                        var re;
                        re = confirm("Do you want to re-sale this product?");
                        if(re){
                            var params={
                                'check_all_shopid': check_all_shopid?1:0,
                                'include_shopids': JSON.stringify(include_shopids),
                                'exclude_shopids': JSON.stringify(exclude_shopids),
                                'sold-out' : 1,
                                'shenhe': 1
                            };
                            $.ajax({
                                type: 'POST',
                                url: base_url + 'ajax/a_product.php',
                                data: params,
                                success: function(data){
                                    // console.log(data);
                                    location.reload();
                                },
                                error: function(data){
                                    console.log(data);
                                }
                            });
                        }
                    }
                }
            },
            {
                "text": 'Sold out',
                "className": "btn btn-green",
                action: function ( e, dt, node, config ) {
                    if(!check_all_shopid && include_shopids.length==0){
                        alert("Please select products that you want to mark sold out");
                    }else{
                        var re;
                        re = confirm("Do you want to mark sold out this product?");
                        if(re){
                            var params={
                                'check_all_shopid': check_all_shopid?1:0,
                                'include_shopids': JSON.stringify(include_shopids),
                                'exclude_shopids': JSON.stringify(exclude_shopids),
                                'sold-out' : 1,
                                'shenhe': 0
                            };
                            $.ajax({
                                type: 'POST',
                                url: base_url + 'ajax/a_product.php',
                                data: params,
                                success: function(data){
                                    // console.log(data);
                                    location.reload();
                                },
                                error: function(data){
                                    console.log(data);
                                }
                            });
                        }
                    }
                }
            }
        ],
        "columnDefs": [
            {
                "targets": 0,
                "data": "shopid"
            },{
                "targets": 1,
                "data": "shopname",
                "render": function ( data, type, row, meta ) {
                    return "<a href='"+base_url+"index.php?route=product-edit&shopid="+row.shopid+"'>"+data+"</a>";
                }
            },{
                "targets": 2,
                "data": "kucun"
            },{
                "targets": 3,
                "data": "shichangjia",
                "render": function ( data, type, row, meta ) {
                    var price = parseInt(data);
                    return "<span>"+String(price).replace(/(.)(?=(\d{3})+$)/g,'$1,')+"￦</span>";
                }
            },{
                "targets": 4,
                "data": "huiyuanjia",
                "render": function ( data, type, row, meta ) {
                    var price = parseInt(data);
                    return "<span>"+String(price).replace(/(.)(?=(\d{3})+$)/g,'$1,')+"￦</span>";
                }
            },{
                "targets": 5,
                "data": "vipjia",
                "render": function ( data, type, row, meta ) {
                    var price = parseInt(data);
                    return "<span>"+String(price).replace(/(.)(?=(\d{3})+$)/g,'$1,')+"￦</span>";
                }
            },{
                "targets": 6,
                "data": "pifajia",
                "render": function ( data, type, row, meta ) {
                    var price = parseInt(data);
                    return "<span>"+String(price).replace(/(.)(?=(\d{3})+$)/g,'$1,')+"￦</span>";
                }
            },{
                "targets": 7,
                "data": "shenhe",
                "render": function ( data, type, row, meta ) {
                    if(data==1) return "<span style='color: green'>Normal Sale</span>";
                    else return "<span style='color: red'>Sold out</span>";
                }
            },{
                "targets": 8,
                "data": "shopid",
                "render": function ( data, type, row, meta ) {
                    return '<button type = "button" name = "delete_shopid" class="btn btn-danger" onclick="delete_shopid('+data+')" />Delete</button>';
                }
            },{
                "targets": 9,
                "data": "shopid",
                "title": "<input type='checkbox' value='all' name='checkAll' onchange='toggle_all_shopid(!check_all_shopid)' />",
                "orderable": false,
                "render": function ( data, type, row, meta ) {
                    data = parseInt(data);
                    // console.log(data, 'data');
                    // console.log(check_all_shopid, 'check_all_shopid');
                    // console.log(include_shopids, 'include_shopids');
                    // console.log(exclude_shopids, exclude_shopids.indexOf(data), 'exclude_shopids');
                    // console.log('--------------');
                    var checked = '';
                    if((check_all_shopid && exclude_shopids.indexOf(data)==-1) || (!check_all_shopid && include_shopids.indexOf(data)!=-1)){
                        checked = 'checked';
                    }
                    return '<input type="checkbox" class="check_shopid" '+checked+' id="'+data+'" name="selectshopid[]" value="'+data+'" onchange="toggle_one_shopid('+data+')" />';
                }
            } 
        ]
    });
}

function toggle_all_shopid(option){
    check_all_shopid = option;
    if(option){
        $(".check_shopid").attr('checked', true);
    }else{
        $(".check_shopid").attr('checked', false);
    }
    include_shopids = [];
    exclude_shopids = [];
}
function toggle_one_shopid(shopid){
    shopid = parseInt(shopid);
    var index_include = include_shopids.indexOf(shopid);
    var index_exclude = exclude_shopids.indexOf(shopid);
    if(check_all_shopid){
        if(index_exclude==-1) exclude_shopids.push(shopid);
        else exclude_shopids.splice(index_exclude, 1);
    }else{
        if(index_include==-1) include_shopids.push(shopid);
        else include_shopids.splice(index_include, 1);
    }
    // console.log(include_shopids, 'include_shopids');
    // console.log(exclude_shopids, 'exclude_shopids');
}
function delete_shopid(shopid){
    var re;
    re = confirm("Do you want to delete this product? This action cannot be reverted");
    if(re){
         var params={
            'check_all_shopid': 0,
            'include_shopids': JSON.stringify([shopid]),
            'detele-shopid' : 1
        };
        $.ajax({
            type: 'POST',
            url: base_url + 'ajax/a_product.php',
            data: params,
            success: function(data){
                console.log(data);
                location.reload();
            },
            error: function(data){
                console.log(data);
            }
        });
    }
}
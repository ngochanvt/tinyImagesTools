<?php
$directory_name="tiny_images_".date('Y-m-d').'_'.date('U');
mkdir($directory_name, 0777, true);
for($i=0;$i<intval($_POST['total']);$i++) {
    if($_FILES['image-'.$i]['error']==0){
        $status=0;
        $_name  = $_FILES['image-'.$i]["name"];
        $desFile=$directory_name.'/'.$_name;
        move_uploaded_file ( $_FILES['image-'.$i]['tmp_name'] ,$desFile);
    }
}
?>
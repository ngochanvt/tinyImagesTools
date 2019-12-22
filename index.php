<html class="no-js" lang="vi">
    <head>
        <title>Nhật Nam</title>
        <meta charset="utf-8">
        <meta name="author" content="">
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1" />
        <meta name='description' content='Nhật Nam'>
        <meta name='keywords' content='Nhật Nam'>
        <link rel="icon"  type="image/png" href="<?=$base_url?>assets/images/<?=$info->logo?>">

        <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
       
    </head>
    <div class="container">
        <div class="row form-control">
            <input type="file" id="input_images" multiple>
            <button type="button" id="button_submit">Submit</button>
        </div>
    </div>
    <body>
        <script type="text/javascript" src="<?=$base_url?>assets/js/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
        <script type="text/javascript" src="assets/js/bootstrap.min.js"></script>    
        <script type="text/javascript">
            var images = [];
            var dataURLtoFile = function(dataurl, filename) {
              var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
              bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
              while(n--){
                  u8arr[n] = bstr.charCodeAt(n);
              }
              return new File([u8arr], filename, {type:mime});
            }
            $(document).on("change", "#input_images", function(evt){
                var files = evt.target.files;
                console.log(files);
                for(var i=0; i<files.length; i++){
                    var reader = new FileReader();
                    reader.fileName = files[i].name 
                    reader.readAsDataURL(files[i]);
                    reader.onload = function(event){
                      var img = new Image();
                      img.src = event.target.result;
                      img.onload = function(){
                        var elem = document.createElement('canvas');
                        elem.width = this.width;
                        elem.height = this.height;
                        var ratio = 0.5;
                        // var downsize = event.total/2;
                        // if(event.total>max_size) ratio = (downsize)/event.total;
                        var ctx = elem.getContext('2d');
                        ctx.drawImage(img, 0, 0, this.width, this.height);
                        ctx.canvas.toBlob(function(blob){
                            file = new File([blob], 'aa', {
                                type: 'image/jpeg',
                                lastModified: Date.now()
                            });
                        }, 'image/jpeg', ratio);
                        var src   = ctx.canvas.toDataURL("image/jpeg",ratio);
                        var file  = dataURLtoFile(src, event.currentTarget.fileName);
                        
                        images.push(file);
                      },reader.onerror = function(error){ 
                        console.log(error)
                      }
                }
              }
            })
            $(document).on("click", "#button_submit", function(e){
                var formData = new FormData();
                formData.append('total', images.length);
                for(var i=0;i<images.length;i++) formData.append('image-'+i,images[i]);
                $.ajax({
                  type: "POST",
                  url: "save_images.php",
                  data: formData,
                  processData: false,  
                    contentType: false,  
                  success: function(data)
                     {
                        console.log(data);
                     }
               });
            })
        </script>
    </body>
</html>
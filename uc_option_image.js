
var UCOI = UCOI || {};

/**
* Initialize.
*/
UCOI.init = function() {
  var size = Drupal.settings.UCOI.size;   
  this.images = Drupal.settings.UCOI.images; 
  this.effect = Drupal.settings.UCOI.effect;
  this.noimage = Drupal.settings.UCOI.noimage;
  this.attributes = Drupal.settings.UCOI.attributes;
  this.defaultSize = Drupal.settings.UCOI.default_size;
                                        
  $('.add_to_cart select.form-select').change(function(){
    var name = $(this).attr('name');
    
    if (name.substr(0, 10) == 'attributes'){
      UCOI.switchImage(this, size);  
    }
  });
};

/**
* Switch an option image.
*/
UCOI.switchImage = function(input, size) {
  var id = $(input).attr('id');
  var pid = $(input).parents('.node').attr('id');
  var nid = pid.replace('node-', '');             
  var aid = id.replace('edit-attributes-', '');
  var oid = $(input).val(); 
  var image = $(input).parents('.content').children('img.uc-option-image');       
  
  // Make sure we have permission to switch this attribute
  if (this.attributes[aid] === 0){
    return;
  }
          
  try {          
    var images = this.images[nid][aid];
                                          
    if (images[oid].derivatives[size]){ 
      var imagepath = Drupal.settings.base_path + images[oid].derivatives[size];   
      this.switchImageEffect(image, imagepath);
    } 
    else { 
      var imagepath = Drupal.settings.base_path + images[oid].derivatives[this.defaultSize];   
      this.switchImageEffect(image, imagepath);
    }
  }
  catch (e){   
    this.switchImageEffect(image, this.noimage); 
  }
};

/**
* Switch the imagepath based on the selected effect.
*/
UCOI.switchImageEffect = function(image, imagepath) {
  switch(this.effect){
    case 'fade':
      $(image).fadeOut(200, function(){
        $(this).attr('src', imagepath).fadeIn(200);
      });
      break;
      
    default:
      $(image).attr('src', imagepath); 
  }
};

if (Drupal.jsEnabled) {
  $(function(){
    UCOI.init();
  });
}
var Yelp            = require('yelp');
var modelbusca      = require('../models/busquedas');
var ultimo          = require('../models/last');
var async           = require('async');
var yelp            = new Yelp({
  consumer_key      : 'IMalIBpzGyeir7pC8r_QkQ',
  consumer_secret   : 'MW2T_28PFECrcVIfVFKPpz_5CXE',
  token             : '3BEScHCdEZT4zb6xPlNgyyf0YrRJ-cV0',
  token_secret      : 'CkLc3NFcQ5webu7igPI7J314ff8',
});
 
module.exports=  function(){
    
    function recoldata(lugar,iduser,funcion){
    
        var businesses  = [];
        var arraynow    = [];
        var estado      ='Abierto';
      
        //find out restaurant by location
        yelp.search({ location:lugar})
        .then(function (data) {
          //iterating with yelp data
           modelbusca.find({},function(err,alldocs){
                async.each(data.businesses,function(yelpdoc){
                    var countreservados = 0;
                    //Counting reservations
                    async.each(alldocs,function(myfile2){
                            
                            if(yelpdoc.id == myfile2.id_reservado){
                            
                                  countreservados += myfile2.noreservados;
                            }
                    });
                    estado = ((yelpdoc.is_closed)?"Cerrado":"Abierto");
                    //iterating with my data
                    async.each(alldocs,function(myfile){
                          if(myfile.id_user == iduser){   
                            //DELETING DUPLICATED DOCS
                                if(yelpdoc.id==myfile.id_reservado){  
                                  
                                        businesses.push({
                                                name:   yelpdoc.name,
                                                  id:   yelpdoc.id,
                                           image_url:   yelpdoc.image_url,
                                      rating_img_url:   yelpdoc.rating_img_url,
                                               state:   estado,
                                            reserved:   myfile.activado,
                                        snippet_text:   yelpdoc.snippet_text,
                                                hide:   myfile.hide,
                                         nreservados:   countreservados
                                             
                                         });  
                                     
                                        arraynow.push(yelpdoc.id);
                                         
                                         
                                }
                            }     
                    });//end myarray
                                
                    if(arraynow.indexOf(yelpdoc.id)== -1 ) {
                        businesses.push({
                                  name:   yelpdoc.name,
                                    id:   yelpdoc.id,
                             image_url:   yelpdoc.image_url,
                        rating_img_url:   yelpdoc.rating_img_url,
                                 state:   estado,
                              reserved:   false,
                          snippet_text:   yelpdoc.snippet_text,
                                  hide:   false,
                           nreservados:   countreservados
                        });
                    }
                                 
                })//end array yelp
                         
                          
                    funcion(businesses);   
                    
            });
 
        }).catch(function (err) {
         console.error('No hay resultados');
        });
        
        
    }
  
  
    
this.postapi=function(req,res){

    if(req.body.inputbuscar){
        
        var input=req.body.inputbuscar.name;
    
        // SAVING LAS VISIT
        ultimo.findByIdAndUpdate('57629e017ba3f5f10c37eb3a', {ultimo:input}, function(err,doc){});
            recoldata(input,req.user.id,function funcion(data){
                res.json(data);
            });
    }   
    
 
   //WHEN BUTTON RESERVER IS CLICKED
    
    if(req.body.id){
        
        var searchQuery = { 
            'id_user'       : req.user.id, //id user
            'id_reservado'  : req.body.id //id restaurant
        };
            modelbusca.find(searchQuery, function(err, foundUsers){
                if(err){} 
                else {
                 
                 //UPDATING 
            
                    if(foundUsers.length){
                         //console.log(doc)
         
                        var activado             = foundUsers[0].activado;
                        foundUsers[0].activado   = !foundUsers[0].activado;
                   
                            if(activado){
                       
                                 foundUsers[0].noreservados = foundUsers[0].noreservados-1;
                                 foundUsers[0].hide         = false;
                            }else{
                                 foundUsers[0].noreservados = foundUsers[0].noreservados+1;
                                 foundUsers[0].hide         = true;
                            }
           
                            foundUsers[0].save(function(err,doc){
                                 console.log('');
                                 console.log('update corretly'+doc);
                                });
                
                    }else{
              
                        //INSERTING NEW RESTAURANT
                    
                             var newdoc = new modelbusca({ 
                                     id_user:   req.user.id,
                                id_reservado:   req.body.id,
                                    activado:   true,
                                noreservados:   1,
                                        hide:   true
            
                                });
        
                            newdoc.save(function(err,doc){console.log('newdoc'+doc)}) 
            
                    }
                
                }
            });
 
    }
    
    
};
   

   
this.yelpapi=function(req,res){
    
    // FIND OUT LAS VISIT
    ultimo.findById('57629e017ba3f5f10c37eb3a', function (err, doc) {
    
      recoldata(doc.ultimo,req.user.id,function funcion(data){
       
         res.json(data);
    
      });

    });

};

    
 
};//end exports

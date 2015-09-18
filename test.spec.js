describe('component', function(){
  var Overlay = window.Overlay;
  /*
   * Test sync
   */
  describe('Test overlay component', function(){
    var overlay;

    it('should place provided content in contentContainer', function(){
      overlay = new Overlay('test');
      expect(overlay.els.contentContainer.text()).toEqual('test');
    });

    it('should allow for custom classes', function(){
      overlay = new Overlay('test', {classes: ['custom-class']});
      expect(overlay.els.container.hasClass('custom-class')).toEqual(true);
    });

    it('should remove the overlay when the close btn is pressed, and we should know this through callback', function(done){
      overlay = new Overlay('test', {
        onClose: function(){
          expect($('body').find('.overlay').length).toEqual(0);
          done();
        }
      });
      overlay.els.closeBtn.click();
    });

    afterEach(function(){
      if(overlay) overlay.close();
    });
  });
});

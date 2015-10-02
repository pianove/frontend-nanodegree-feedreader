/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
   /* This test suite 'Rss Feeds' is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* to test that the allFeeds variable has been defined 
         * and that it is not empty.
         */
        it('allFeeds variable is defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* to test that each feed in the allFeeds object 
         *  has a URL defined and that it is not empty.
         */
        it('URL is defined and not empty in each feed in the allFeeds variable', function(){
            allFeeds.forEach(function (feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        /* to test that each feed in the allFeeds object
         * has a name defined and that it is not empty.
         */
         it('Name is defined and not empty in each feed in the allFeeds variable', function(){
            allFeeds.forEach(function (feed){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


   /* This test suite "The menu" is all about the menu element
    * visibility (hiding/showing) changes. 
    */
    describe('The menu', function() {

        /* to test that the menu element is
         * hidden by default.
         */
        it('Menu element is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });    

         /* to test that the menu changes
          * visibility when the menu icon is clicked: 
          * 1. the menu displays when clicked
          * 2. the menu hides when clicked again.
          */
        it('Menu changes visibility, when the menu icon is first clicked ' +
            'then clicked again', function(){
            //first click on the menu
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).not.toBe(true);
            //click again on the menu
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });            
    });

  /* This test suite "Initial Entries" is about the changes within feed container 
   * after the loadFeed function is called and completed.
   */
   describe('Initial Entries', function() {
    
        //the loadFeed() is completed asynchronously
        beforeEach(function(done){
            loadFeed(0, function(){ 
                done();                           
            });        
        });
    
        /* to test when the loadFeed function is called and 
         * completes its work, there is at least a single 
         * .entry element within the .feed container
         */
        it ('There is at least a single .entry element within the .feed container ' +
            'when loadFeed called and completed',
            function(done) {      
            expect($('.feed').has('.entry').length > 0).toBe(true); 
                done();
        });
   });
    
   /* This test suite "New Feed Selection" is about the content changes
   *  when a new feed is loaded after the loadFeed function is called and 
   * completed.
   */
   describe('New Feed Selection', function() {
        var before = $('.entry').text();
        //the loadFeed() is completed asynchronously
        beforeEach(function(done){
            loadFeed(0, function(){ 
                done();                           
            });        
        });
       console.log(before);
       
        /* to test when the loadFeed function is called and 
         * completes its work, there is actual content change
         */
        it ('The content actually changes within .entry element ' +
            'when loadFeed called and completed',
            function(done) {      
            expect($('.entry').text().localeCompare(before)).not.toBe(0); 
                done();
        });
   });    
});
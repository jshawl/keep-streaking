
$('input[type="checkbox"]').on('change', function(){
  $(this).closest('form').submit();
});

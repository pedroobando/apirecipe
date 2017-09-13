$(document).ready(function() {
	$('.delete-recipe').on('click', function() {
		var id = $(this).data('id');
		var url = '/delete/'+id;
		if(confirm('Delete Recipe?')){
			$.ajax({
				url:url,
				type: 'DELETE',
				success: function(result) {
					console.log('Deleting Recipe...');
					window.location.href='/';
				},
				error: function(err) {
					console.log(err);
				}
			});
		}
	});

	$('.edit-category').on('click', function() {
		$('#edit-form-name').val($(this).data('name'));
		// $('#edit-form-active').val($(this).data('active'));
		$('#edit-form-active').val(0);
		// $('#edit-form-ingredents').val($(this).data('ingredents'));
		// $('#edit-form-directions').val($(this).data('directions'));
		$('#edit-form-id').val($(this).data('id'));

	});
});

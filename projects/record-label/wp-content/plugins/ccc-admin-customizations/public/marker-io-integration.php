<?php 


// Add the Marker.io code snippet (these are out of the way)
if (!function_exists('ccc_marker_snippet')) {
    function ccc_marker_snippet() { global $post;

        global $wp;
        $options = get_option( 'cccac_api_settings' );
        $host = $_SERVER['HTTP_HOST'];
        $queryString = $_SERVER['QUERY_STRING'];
        $query_string_field = $options['cccmio_query_string'];
        if ($query_string_field) {
            $custom_query_string = $query_string_field;
        } else {
            $custom_query_string = 'bug';
        }
        $destination_id = $options['cccmio_field_destination'];
        $user_ip = $_SERVER['REMOTE_ADDR'];
        $ip_list = explode(',', str_replace(' ', '', $options['cccmio_ip_addresses']));
        $show_always = $options['cccmio_show_always'];
        $show_in_admin = $options['cccmio_show_in_admin'];


        if($destination_id) { ?>

            <script>
                console.log('<?=$query_string_field?>');
                console.log('<?=$queryString?>');
                console.log(<?=json_encode($ip_list)?>);
                console.log('<?=$user_ip?>');

                <?php if ( in_array($user_ip, $ip_list) ) { ?>
                    console.log('IP address matches');
                <?php } else { ?>
                    console.log('IP address does not match');
                <?php } ?>


            </script>



            <?php 


            if( $show_always == true || is_user_logged_in() || strpos($host, 'wpengine.com') !== false || $queryString === $custom_query_string || in_array($user_ip, $ip_list) ) { ?>
               <script>
                  window.markerConfig = {
                    destination: '<?=$destination_id?>', 
                    source: 'snippet'
                  };
                </script>

                <script>
                !function(e,r,a){if(!e.__Marker){e.__Marker={};var t=[],n={__cs:t};["show","hide","isVisible","capture","cancelCapture","unload","reload","isExtensionInstalled","setReporter","setCustomData","on","off"].forEach(function(e){n[e]=function(){var r=Array.prototype.slice.call(arguments);r.unshift(e),t.push(r)}}),e.Marker=n;var s=r.createElement("script");s.async=1,s.src="https://edge.marker.io/latest/shim.js";var i=r.getElementsByTagName("script")[0];i.parentNode.insertBefore(s,i)}}(window,document);

                </script>
            <?php }

        }

    } 
    add_action( 'wp_head', 'ccc_marker_snippet' );
}

function add_widget_to_admin() {
    global $wp;
    $options = get_option( 'cccac_api_settings' );
    $destination_id = $options['cccmio_field_destination'];
    $show_in_admin = $options['cccmio_show_in_admin'];

    if($show_in_admin) { ?>
        <script>
              window.markerConfig = {
                destination: '<?=$destination_id?>', 
                source: 'snippet'
              };
            </script>

            <script>
            !function(e,r,a){if(!e.__Marker){e.__Marker={};var t=[],n={__cs:t};["show","hide","isVisible","capture","cancelCapture","unload","reload","isExtensionInstalled","setReporter","setCustomData","on","off"].forEach(function(e){n[e]=function(){var r=Array.prototype.slice.call(arguments);r.unshift(e),t.push(r)}}),e.Marker=n;var s=r.createElement("script");s.async=1,s.src="https://edge.marker.io/latest/shim.js";var i=r.getElementsByTagName("script")[0];i.parentNode.insertBefore(s,i)}}(window,document);

            </script>
    <?php 
    }
}
add_action( 'admin_head', 'add_widget_to_admin');
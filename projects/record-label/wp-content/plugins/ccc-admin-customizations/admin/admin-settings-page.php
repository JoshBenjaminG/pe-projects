<?php

// Add Settings Page
function cccac_api_add_admin_menu(  ) {
    add_options_page( 'CCC Admin Customizations', 'CCC Admin Customizations', 'manage_options', 'ccc-admin-customizations', 'cccac_api_options_page' );
}
add_action( 'admin_menu', 'cccac_api_add_admin_menu' );


// Add the Settings
add_action( 'admin_init', 'cccac_api_settings_init' );

function cccac_api_settings_init(  ) {
    register_setting( 'cccacPlugin', 'cccac_api_settings' );
    add_settings_section(
        'cccac_api_cccacPlugin_section',
        __( 'Admin Bar Customizations', 'wordpress' ),
        'cccac_api_settings_section_callback',
        'cccacPlugin'
    );

    add_settings_field(
        'cccac_api_hide_admin_toggle',
        __( 'Hide Admin Bar/Show Admin Buttons', 'wordpress' ),
        'cccac_api_hide_admin_toggle',
        'cccacPlugin',
        'cccac_api_cccacPlugin_section'
    );

    add_settings_field(
        'cccac_api_admin_buttons_location_select',
        __( 'Admin Buttons Location', 'wordpress' ),
        'cccac_api_admin_buttons_location_select_render',
        'cccacPlugin',
        'cccac_api_cccacPlugin_section'
    );

    add_settings_field(
        'cccac_api_show_customize_button_checkbox',
        __( 'Show Customize Button?', 'wordpress' ),
        'cccac_api_show_customize_button_checkbox',
        'cccacPlugin',
        'cccac_api_cccacPlugin_section'
    );

    add_settings_field(
        'cccac_api_show_quick_edit_button_checkbox',
        __( 'Show Quick Edit Button?', 'wordpress' ),
        'cccac_api_show_quick_edit_button_checkbox',
        'cccacPlugin',
        'cccac_api_cccacPlugin_section'
    );


// Add the settings section for Marker IO integration
    add_settings_section(
        'cccac_marker_io_section',
        __( 'MARKER.IO Integration', 'wordpress' ),
        'cccac_api_settings_section_callback',
        'cccacPlugin'
    );

    add_settings_field(
        'cccmio_field_destination',
        __( 'Marker.IO Destination ID', 'wordpress' ),
        'cccmio_field_destination_render',
        'cccacPlugin',
        'cccac_marker_io_section'
    );


    add_settings_field(
        'cccmio_show_always',
        __( 'Display Widget to Everyone', 'wordpress' ),
        'cccmio_show_always_render',
        'cccacPlugin',
        'cccac_marker_io_section'
    );


    add_settings_field(
        'cccmio_show_in_admin',
        __( 'Display Widget on Admin Pages', 'wordpress' ),
        'cccmio_show_in_admin_render',
        'cccacPlugin',
        'cccac_marker_io_section'
    );

    add_settings_field(
        'cccmio_ip_addresses',
        __( 'IP Addresses', 'wordpress' ),
        'cccmio_ip_addresses_render',
        'cccacPlugin',
        'cccac_marker_io_section'
    );

    add_settings_field(
        'cccmio_query_string',
        __( 'Custom Query String', 'wordpress' ),
        'cccmio_custom_query_string_render',
        'cccacPlugin',
        'cccac_marker_io_section'
    );
}


function cccac_api_admin_buttons_location_select_render(  ) {
    $options = get_option( 'cccac_api_settings' );
    ?>
    <select name='cccac_api_settings[cccac_api_admin_buttons_location_select]'>
        <option value='1' <?php selected( $options['cccac_api_admin_buttons_location_select'], 1 ); ?>>Top Left</option>
        <option value='2' <?php selected( $options['cccac_api_admin_buttons_location_select'], 2 ); ?>>Top Right</option>
        <option value='3' <?php selected( $options['cccac_api_admin_buttons_location_select'], 3 ); ?>>Bottom Left</option>
        <option value='4' <?php selected( $options['cccac_api_admin_buttons_location_select'], 4 ); ?>>Bottom Right</option>

    </select>

<?php
}


function cccac_api_show_customize_button_checkbox () {
    $options = get_option( 'cccac_api_settings' );
    $html = "<label class='switch'>";

    if ( empty( $options['cccac_api_show_customize_button_checkbox'] ) ) $options['cccac_api_show_customize_button_checkbox'] = 0;

    $html .= "<input type='checkbox' name='cccac_api_settings[cccac_api_show_customize_button_checkbox]' value='1' " . checked($options['cccac_api_show_customize_button_checkbox'], 1, false) . " >";
    $html .= "</label>";

    echo $html;
}

function cccac_api_show_quick_edit_button_checkbox () {
    $options = get_option( 'cccac_api_settings' );
    $html = "<label class='switch'>";

    if ( empty( $options['cccac_api_show_quick_edit_button_checkbox'] ) ) $options['cccac_api_show_quick_edit_button_checkbox'] = 0;

    $html .= "<input type='checkbox' name='cccac_api_settings[cccac_api_show_quick_edit_button_checkbox]' value='1' " . checked($options['cccac_api_show_quick_edit_button_checkbox'], 1, false) . " >";
    $html .= "</label>";

    echo $html;
}


function cccac_api_hide_admin_toggle () {
    $options = get_option( 'cccac_api_settings' );
    $html = "<label class='switch'>";

    if ( empty( $options['cccac_api_hide_admin_toggle'] ) ) $options['cccac_api_hide_admin_toggle'] = 0;

    $html .= "<input type='checkbox' name='cccac_api_settings[cccac_api_hide_admin_toggle]' value='1' " . checked($options['cccac_api_hide_admin_toggle'], 1, false) . " >";
    $html .= "</label>";

    echo $html;
}



// Display Marker IO Section Fields
function cccmio_field_destination_render(  ) {
    $options = get_option( 'cccac_api_settings' );
    ?>
    <input type='text' name='cccac_api_settings[cccmio_field_destination]' value='<?php echo $options['cccmio_field_destination']; ?>'>
    <?php
}


function cccmio_show_always_render(  ) {
    $options = get_option( 'cccac_api_settings' );
    $html = "<label class='switch'>";

    if ( empty( $options['cccmio_show_always'] ) ) $options['cccmio_show_always'] = 0;

    $html .= "<input type='checkbox' name='cccac_api_settings[cccmio_show_always]' value='1' " . checked($options['cccmio_show_always'], 1, false) . " >";
    $html .= "</label>";
    $html .= '<br>Check this box to show the Marker.io widget to everyone at all times.';

    echo $html;
}


function cccmio_show_in_admin_render(  ) {
    $options = get_option( 'cccac_api_settings' );
    $html = "<label class='switch'>";

    if ( empty( $options['cccmio_show_in_admin'] ) ) $options['cccmio_show_in_admin'] = 0;

    $html .= "<input type='checkbox' name='cccac_api_settings[cccmio_show_in_admin]' value='1' " . checked($options['cccmio_show_in_admin'], 1, false) . " >";
    $html .= "</label>";
    $html .= '<br>Check this box to show the Marker.io widget on WP Admin pages.';

    echo $html;
}



function cccmio_ip_addresses_render(  ) {
    $options = get_option( 'cccac_api_settings' );
    ?>
    <input type='text' name='cccac_api_settings[cccmio_ip_addresses]' value='<?php echo $options['cccmio_ip_addresses']; ?>'>
    <br>Separate each entry by a comma.

    <?php
}


function cccmio_custom_query_string_render(  ) {
    $options = get_option( 'cccac_api_settings' );
    ?>
    <div class="prefix">?</div><input type='text' name='cccac_api_settings[cccmio_query_string]' value='<?php echo $options['cccmio_query_string']; ?>'>
    <br>Enter a custom query string that can be used by anyone to reload the page with the widget displayed. (Default query string is 'bug'.)

    <?php
}



// Callback for Settings
function cccac_api_settings_section_callback(  ) {
    echo __( '', 'wordpress' );
}




function cccac_api_options_page(  ) {
    ?>
    <style>
    	.cccac-options-form table {
    		margin-bottom: 32px;
    	}
    	.cccac-options-form h2 {
    		text-decoration: underline;
    	}
    	.form-table th {
    		padding: 10px;
    		width: 250px;
    		line-height: 2;
    	}
    	.form-table td {
    		padding: 10px;
    	}

        @media screen and (min-width:768px) {
            .cccac-options-form td {
                padding-right: 40%;
            }
        }
        .cccac-options-form tr {
            position: relative;
        }
        .cccac-options-form input:not(input[type="checkbox"], input[type="submit"]) {
            width: 100%;
        }

        .cccac-options-form input[name='cccac_api_settings[cccmio_query_string]'] {
            padding-left: 1.1rem;
        }
        .cccac-options-form .prefix {
            position: absolute;
            font-size: 1rem;
            color: #8a8a8a;
            top: 15px;
            left: 290px;
        }
    </style>
    <form class="cccac-options-form" action='options.php' method='post'>

        <h1 style="margin-bottom: 3rem">CCC Admin Customizations</h1>

        <?php
        settings_fields( 'cccacPlugin' );
        do_settings_sections( 'cccacPlugin' );
        submit_button();
        ?>

    </form>
    <?php
}
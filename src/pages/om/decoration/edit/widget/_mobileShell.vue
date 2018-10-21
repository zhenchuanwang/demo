<!-- Created by henian.xu on 2018/9/5. -->

<template>
    <div class="mobile-shell">
        <div class="header">
            <div class="hardware">
                <div class="camera"/>
                <div class="trumpet">
                    <div class="small"/>
                    <div class="big"/>
                </div>
            </div>
        </div>
        <div class="body">
            <ScreenShell>
                <slot/>
            </ScreenShell>
        </div>
        <div class="footer">
            <div class="hardware">
                <div class="button"/>
            </div>
        </div>
    </div>
</template>

<script>
import ScreenShell from './_screenShell';
export default {
    name: 'MobileShell',
    components: { ScreenShell },
};
</script>

<style lang="scss">
.mobile-shell {
    display: inline-block;
    background-color: #000;
    border-radius: $padding;
    padding: $padding;

    > .header {
        > .hardware {
            text-align: center;
            padding: $padding-small;
            line-height: 1;
            margin-bottom: $margin;
            > .camera {
                background-color: #ccc;
                display: inline-block;
                width: 10px;
                height: 10px;
                border-radius: 100%;
            }
            > .trumpet {
                > .small {
                    background-color: #ccc;
                    display: inline-block;
                    width: 6px;
                    height: 6px;
                    border-radius: 100%;
                }
                > .big {
                    background-color: #ccc;
                    display: inline-block;
                    width: 40px;
                    height: 6px;
                    border-radius: 5px;
                    margin-left: $margin;
                }
            }
        }
    }
    > .body {
    }
    > .footer {
        text-align: center;
        padding: $padding;
        > .hardware {
            margin-top: $margin;
            > .button {
                background-color: #ccc;
                display: inline-block;
                width: 40px;
                height: 40px;
                border-radius: 100%;
            }
        }
    }
}
</style>

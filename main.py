def on_up_pressed():
    mySprite.vy += -100
    pause(500)
    mySprite.vy += 0
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_b_pressed():
    mySprite.vy += -100
    pause(500)
    mySprite.vy += 0
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_overlap_tile(sprite, location):
    global level
    level += 1
    loadLevel(level)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        Finish line turn
        """),
    on_overlap_tile)

def on_a_pressed():
    global crouched
    if crouched:
        crouched = 0
        mySprite.set_image(assets.image("""
            Prototype Steve
            """))
    else:
        crouched = 1
        mySprite.set_image(assets.image("""
            Prototype Steve Crouched
            """))
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_left_pressed():
    if crouched:
        mySprite.set_image(assets.image("""
            princessLeftCrouched
            """))
    else:
        mySprite.set_image(assets.image("""
            princessLeft0
            """))
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def loadLevel(levelNum: number):
    if levelNum == 0:
        tiles.set_current_tilemap(tilemap("""
            Level0
            """))
        mySprite.set_position(19, 55)
    else:
        if levelNum == 1:
            tiles.set_current_tilemap(tilemap("""
                Level1
                """))
            mySprite.set_position(19, 74)
        else:
            if levelNum == 2:
                tiles.set_current_tilemap(tilemap("""
                    Level2
                    """))
                mySprite.set_position(64, 864)
            else:
                if levelNum == 3:
                    game.game_over(True)
                else:
                    pass

def on_right_pressed():
    if crouched:
        mySprite.set_image(assets.image("""
            princessRightCrouched
            """))
    else:
        mySprite.set_image(assets.image("""
            princessRight
            """))
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_overlap_tile2(sprite2, location2):
    global level
    level += 1
    loadLevel(level)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        Finish line
        """),
    on_overlap_tile2)

def on_overlap_tile3(sprite3, location3):
    scene.camera_shake(4, 500)
    info.change_life_by(-1)
    loadLevel(level)
scene.on_overlap_tile(SpriteKind.player,
    sprites.dungeon.hazard_lava1,
    on_overlap_tile3)

def on_down_pressed():
    global crouched
    if crouched:
        crouched = 0
        mySprite.set_image(assets.image("""
            Prototype Steve
            """))
    else:
        crouched = 1
        mySprite.set_image(assets.image("""
            Prototype Steve Crouched
            """))
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def on_life_zero():
    game.game_over(False)
info.on_life_zero(on_life_zero)

crouched = 0
level = 0
mySprite: Sprite = None
scene.set_background_color(15)
mySprite = sprites.create(assets.image("""
        Prototype Steve
        """),
    SpriteKind.player)
level = 0
controller.move_sprite(mySprite, 100, 0)
mySprite.ay = 300
scene.camera_follow_sprite(mySprite)
info.set_life(3)
loadLevel(level)

def on_update_interval():
    if mySprite.tile_kind_at(TileDirection.CENTER,
        assets.tile("""
            collectibleRedCrystal
            """)):
        info.change_life_by(1)
        effects.hearts.start_screen_effect(2000)
        tiles.set_tile_at(mySprite.tilemap_location(),
            assets.tile("""
                transparency16
                """))
game.on_update_interval(100, on_update_interval)

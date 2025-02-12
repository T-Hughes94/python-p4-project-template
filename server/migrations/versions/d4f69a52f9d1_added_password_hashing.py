"""added password hashing

Revision ID: d4f69a52f9d1
Revises: 
Create Date: 2023-10-24 16:17:51.394373

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd4f69a52f9d1'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('food_truck_event_table')
    op.drop_table('event_table')
    op.drop_table('food_truck_table')
    op.drop_table('user_table')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_table',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(), nullable=True),
    sa.Column('_password_hash', sa.VARCHAR(), nullable=True),
    sa.Column('email', sa.VARCHAR(), nullable=True),
    sa.Column('profile_img', sa.VARCHAR(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('food_truck_table',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(), nullable=True),
    sa.Column('food_type', sa.VARCHAR(), nullable=True),
    sa.Column('description', sa.VARCHAR(), nullable=True),
    sa.Column('user_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user_table.id'], name='fk_food_truck_table_user_id_user_table'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('event_table',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(), nullable=True),
    sa.Column('location', sa.VARCHAR(), nullable=True),
    sa.Column('description', sa.VARCHAR(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('food_truck_event_table',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('food_sales', sa.FLOAT(), nullable=True),
    sa.Column('beverage_sales', sa.FLOAT(), nullable=True),
    sa.Column('food_cost', sa.FLOAT(), nullable=True),
    sa.Column('beverage_cost', sa.FLOAT(), nullable=True),
    sa.Column('fuel_cost', sa.FLOAT(), nullable=True),
    sa.Column('food_truck_id', sa.INTEGER(), nullable=True),
    sa.Column('event_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['event_id'], ['event_table.id'], name='fk_food_truck_event_table_event_id_event_table'),
    sa.ForeignKeyConstraint(['food_truck_id'], ['food_truck_table.id'], name='fk_food_truck_event_table_food_truck_id_food_truck_table'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###

"""empty message

Revision ID: f39605b71a61
Revises: 
Create Date: 2020-11-18 16:46:31.221355

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f39605b71a61'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('pyprojects',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('repo_id', sa.String(length=80), nullable=True),
    sa.Column('name', sa.String(length=80), nullable=True),
    sa.Column('url', sa.String(length=500), nullable=True),
    sa.Column('description', sa.String(length=5000), nullable=True),
    sa.Column('num_stars', sa.Integer(), nullable=True),
    sa.Column('created_date', sa.DateTime(), nullable=True),
    sa.Column('last_push_date', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('pyprojects')
    # ### end Alembic commands ###
package database

import (
	"context"
	"fmt"
	"net/url"
	"time"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq" // <------------ here
)

// Config is the required properties to use the database.
type Config struct {
	User         string `conf:"default:postgres"`
	Password     string `conf:"default:postgres,mask"`
	Host         string `conf:"default:database-service.sales-system.svc.cluster.local"`
	Name         string `conf:"default:postgres"`
	MaxIdleConns int    `conf:"default:2"`
	MaxOpenConns int    `conf:"default:0"`
	DisableTLS   bool   `conf:"default:true"`
}

func Open(cfg Config) (*sqlx.DB, error) {
	sslMode := "require"
	if cfg.DisableTLS {
		sslMode = "disable"
	}

	q := make(url.Values)
	q.Set("sslmode", sslMode)
	q.Set("timezone", "utc")

	u := url.URL{
		Scheme:   "postgres",
		User:     url.UserPassword(cfg.User, cfg.Password),
		Host:     cfg.Host,
		Path:     cfg.Name,
		RawQuery: q.Encode(),
	}

	db, err := sqlx.Open("pgx", u.String())
	if err != nil {
		fmt.Println("erro", err)
		return nil, err
	}
	db.SetMaxIdleConns(cfg.MaxIdleConns)
	db.SetMaxOpenConns(cfg.MaxOpenConns)

	return db, nil
}

func StatusCheck(ctx context.Context, db *sqlx.DB) error {
	if _, ok := ctx.Deadline(); !ok {
		var cancel context.CancelFunc
		ctx, cancel = context.WithTimeout(ctx, time.Second)
		defer cancel()
	}

	const q = `SELECT true`
	var tmp bool

	return db.QueryRowContext(ctx, q).Scan(&tmp)

}

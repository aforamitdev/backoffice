package database

import (
	"context"
	"fmt"
	"net/url"
	"time"

	pgx "github.com/jackc/pgx/v5"

	_ "github.com/lib/pq" // <------------ here
)

// Config is the required properties to use the database.
type Config struct {
	User         string `conf:"default:postgres"`
	Password     string `conf:"default:postgres,mask"`
	Host         string `conf:"default:database-service.sales-system.svc.cluster.local"`
	Name         string `conf:"default:main"`
	MaxIdleConns int    `conf:"default:2"`
	MaxOpenConns int    `conf:"default:0"`
	DisableTLS   bool   `conf:"default:true"`
}

func Open(cfg Config) (*pgx.Conn, error) {
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
	db, err := pgx.Connect(context.Background(), u.String())
	if err != nil {
		fmt.Println("erro", err)
		return nil, err
	}

	return db, nil
}

func StatusCheck(ctx context.Context, db *pgx.Conn) error {
	if _, ok := ctx.Deadline(); !ok {
		var cancel context.CancelFunc
		ctx, cancel = context.WithTimeout(ctx, time.Second)
		defer cancel()
	}

	const q = `SELECT true`
	var tmp bool

	return db.QueryRow(ctx, q).Scan(&tmp)

}
